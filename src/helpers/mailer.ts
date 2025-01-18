import nodemailer from "nodemailer";
import { User } from "@/models/userModel";
import bcryptjs from "bcryptjs";

// Define types for the input parameters of sendEmail
interface SendEmailParams {
  email: string;
  emailType: "VERIFY" | "RESET"; // restricts to only these two types
  userid: string; // assuming userid is a string, adjust as needed
}

export async function sendEmail({ email, emailType, userid }: SendEmailParams) {
  try {
    // Create a hashed token for verification or password reset
    const hashedToken = await bcryptjs.hash(userid.toString(), 10);

    // Update the user with the respective token and expiry date
    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userid, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000, // 1 hour expiry
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userid, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000, // 1 hour expiry
      });
    }

    // Create a transporter using your email service (Mailtrap for dev)
    const transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.EMAIL_TRAP_USER,
        pass: process.env.EMAIL_TRAP_PASSWORD,
      },
    });

    // Define the email options
    const mailOptions = {
      from: "srinivaskoruprolu5@gmail.com", // Sender's email address
      to: email, // Recipient's email address
      subject:
        emailType === "VERIFY"
          ? "Verify Your Email Address"
          : "Reset Your Password",
      html: `
        <p>Hello,</p>
        <p>You requested to ${
          emailType === "VERIFY" ? "verify your email address" : "reset your password"
        }. Please click the link below to ${
        emailType === "VERIFY" ? "verify your email" : "reset your password"
      }:</p>
        <a href="${
          emailType === "VERIFY"
            ? `${process.env.DOMAIN}/verifyemail?token=${hashedToken}`
            : `${process.env.DOMAIN}/resetpassword?token=${hashedToken}`
        }" style="color:blue; text-decoration:underline;">Click here</a>
        <p>If you did not request this, please ignore this email.</p>
        <p>Thank you,<br>Your Application Team</p>
      `,
    };

    // Send the email
    const emailResponse = await transporter.sendMail(mailOptions);
    return emailResponse;
  } catch (error: unknown) {
    // Proper error handling with type-safe access to error.message
    if (error instanceof Error) {
      throw new Error(error.message); // Safely access error.message
    }
    throw new Error("An unexpected error occurred");
  }
}
