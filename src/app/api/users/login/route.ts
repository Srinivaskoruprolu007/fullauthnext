import { connect } from "@/app/dbConfig/dbConfig";
import { User } from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;
    console.log(reqBody);

    // Check if user exists
    const user = await User.findOne({ email: email });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 }); // Changed to 404
    }

    // Check if password is correct
    const validPassword = await bcryptjs.compare(password, user.password);
    if (!validPassword) {
      return NextResponse.json({ error: "Invalid Password" }, { status: 401 }); // Changed to 401
    }

    // Create token data
    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
    };

    // Create token
    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1d",
    });

    // Set cookie with token
    const response = NextResponse.json({
      message: "Login successful",
      status: true,
    });
    response.cookies.set("token", token, {
      httpOnly: true,
    });

    return response;
  } catch (error: unknown) {
    // Handle errors with proper type checking
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message, status: 500 }); // Use 500 for server errors
    }
    return NextResponse.json({ error: "An unexpected error occurred", status: 500 });
  }
}
