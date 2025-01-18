import nodemailer from "nodemailer";
import { User } from "@/models/userModel";
import bcryptjs from "bcryptjs";
export async function sendEmail({ email, emailType, userid }: any) {
  try {
    // create a hashed token
    const hashedToken = await bcryptjs.hash(userid.toString(), 10);
    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userid, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userid, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }
    const transporter = nodemailer.createTransport({
      // Looking to send emails in production? Check out our Email API/SMTP product!
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.EMAIL_TRAP_USER,
        pass: process.env.EMAIL_TRAP_PASSWORD,
      },
    });

    const mailOptions = {
      from: "srinivaskoruprolu5@gmail.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify Your Email Address" : "Reset Your Password",
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
    
    const emailResponse = await transporter.sendMail(mailOptions);
    return emailResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
