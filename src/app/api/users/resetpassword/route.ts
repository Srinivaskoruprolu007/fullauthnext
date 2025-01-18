import { connect } from "@/app/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import { User } from "@/models/userModel";
import bcryptjs from "bcryptjs";

connect();

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const { password, token } = reqBody;
    console.log(reqBody);
    // find the user with valid token and expiry
    const user = await User.findOne({
      forgotPasswordToken: token,
      forgotPasswordTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json({ error: "Invalid token" }, { status: 400 });
    }

    // hash password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    user.password = hashedPassword;
    user.forgotPasswordToken = undefined;
    user.forgotPasswordTokenExpiry = undefined;

    await user.save();

    return NextResponse.json({
      message: "Password reset successful",
      success: true,
      status: 200,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
