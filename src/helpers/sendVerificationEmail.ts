import { Resend } from "resend";
import bcrypt from "bcryptjs";
import { ApiResponse } from "@/types/ApiResponse";
import VerificationEmail from "../../emails/verificationEmails";

export default async function sendVerificationEmail(
    email: string,
    username: string,
    verifyCode: string
): Promise<ApiResponse> {
    const resend = new Resend(process.env.RESEND_API_KEY);

    

    try {
      await resend.emails.send({
          from: 'onboarding@resend.dev',
          to: email,
          subject: "Verify your email",
          react: VerificationEmail({username, otp: verifyCode}),
      });
      return {success: true, message: "Verification email send successfully"}
    } catch (error) {
      console.error("Resend error:", error);
      return {success: false, message: "Error while sending verification Email"}

    }
}
