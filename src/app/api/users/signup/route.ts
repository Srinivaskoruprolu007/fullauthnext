// to connect to our DB let's import the connect function
import { connect } from "@/app/dbConfig/dbConfig";
import { User } from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, email, password } = reqBody;

    console.log(reqBody);
    // check if user already exists
    const user = await User.findOne({ email });
    if (user)
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );

    // hash password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    console.log(savedUser);
    await sendEmail({ email, emailType: "VERIFY", userid: savedUser._id });
    return NextResponse.json({
      message: "User created successfully",
      success: true,
      status: 201,
      savedUser,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message, status: 500 });
    }
    return NextResponse.json({
      error: "An unexpected error occurred",
      status: 500,
    });
  }
}
