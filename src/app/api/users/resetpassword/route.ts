import { connect } from "@/app/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import { User } from "@/models/userModel";
import bcryptjs from "bcryptjs";

// Ensure the database connection is established
connect();

export async function POST(req: NextRequest) {
  try {
    const reqBody: { password: string; token: string } = await req.json();
    const { password, token } = reqBody;

    // Validate input
    if (!password || !token) {
      return NextResponse.json(
        { error: "Password and token are required" },
        { status: 400 }
      );
    }

    // Find user by token and ensure token is not expired
    const user = await User.findOne({
      forgotPasswordToken: token,
      forgotPasswordTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 400 }
      );
    }

    // Hash the new password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // Update user password and clear reset token
    user.password = hashedPassword;
    user.forgotPasswordToken = undefined;
    user.forgotPasswordTokenExpiry = undefined;

    // Save the updated user document
    await user.save();

    return NextResponse.json(
      {
        message: "Password reset successful",
        success: true,
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error resetting password:", error.message);
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
