import nodemailer from "nodemailer";
import { Response } from "express";
import { GameUserResponse } from "../../types/gameUserModel";

const ResetPasswordEmail = async (
  user: GameUserResponse,
  OptResetPassword: string,
  res: Response
) => {
  try {
    // Create the transporter
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.User_Email, // Sender email from environment variable
        pass: process.env.User_Password, // Sender password from environment variable
      },
    });

    // Email options
    let mailOptions = {
      from: process.env.User_Email,
      to: user.email, // Recipient email
      subject: "Reset Your Password - Track Hire",
      html: `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Reset Password</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 0;
        background-color: #f4f4f4;
        color: #333;
      }
      .email-container {
        max-width: 600px;
        margin: 20px auto;
        padding: 20px;
        background-color: #ffffff;
        border-radius: 10px;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
      }
      .header {
        text-align: center;
        margin-bottom: 20px;
      }
      .header h1 {
        margin: 0;
        font-size: 24px;
        color: #0056b3;
      }
      .content {
        line-height: 1.6;
        font-size: 16px;
      }
      .content p {
        margin: 10px 0;
      }
      .otp {
        display: block;
        font-size: 20px;
        font-weight: bold;
        color: #0056b3;
        text-align: center;
        margin: 20px 0;
      }
      .footer {
        text-align: center;
        margin-top: 20px;
        font-size: 14px;
        color: #888;
      }
    </style>
  </head>
  <body>
    <div class="email-container">
      <div class="header">
        <h1>Reset Your Password</h1>
      </div>
      <div class="content">
        <p>Hello ${user.userName},</p>
        <p>
          We received a request to reset the password for your account. Please use the OTP
          below to reset your password:
        </p>
        <div class="otp">${OptResetPassword}</div>
        <p>
          If you did not request this change, please contact our support team immediately.
        </p>
        <p>Thank you,<br />The Track Hire Team</p>
      </div>
      <div class="footer">
        <p>&copy; ${new Date().getFullYear()} Track Hire. All rights reserved.</p>
      </div>
    </div>
  </body>
</html>
      `,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    console.log("Reset password email sent successfully.");
  } catch (error: any) {
    console.error("Error sending email:", error.message);
    res.status(500).send({
      status: false,
      message: "Failed to send reset password email.",
      data: null,
    });
  }
};

export default ResetPasswordEmail;
