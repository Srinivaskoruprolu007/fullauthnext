import { connect } from "@/app/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import { User } from "@/models/userModel";
import { sendEmail } from "@/helpers/mailer";

// Ensure the database connection is established
connect();

export async function POST(req: NextRequest) {
  try {
    const reqBody: { email: string } = await req.json();
    const { email } = reqBody;

    // Validate email
    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 400 }
      );
    }

    // Send password reset email
    await sendEmail({ email, emailType: "RESET", userid: user._id });

    return NextResponse.json({
      message: "Email sent successfully",
      success: true,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error occurred:", error.message);
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
