import { Request, Response } from "express";
import { sendErrorResponse, sendSuccessWithoutResponse } from "../../utils/responseFun";
import { GameUserModel } from "../../model/UserModel/gameUser";
import { GameUserResponse } from "../../types/gameUserModel";

// Controller to check the OTP for password reset
const CheckOtpPassword = async (req: Request, res: Response): Promise<Response> => {
  try {
    // Destructure the email and OTP from the request body
    const { email, otp } = req.body;

    // Validate input data
    if (!email || !otp) {
      return sendErrorResponse(res, 400, "Email and OTP are required.");
    }

    // Check if the user exists with the provided email and OTP
    const user: GameUserResponse | null = await GameUserModel.findOne({ email, optResetPassword: otp });

    if (!user) {
      // If user is not found or OTP doesn't match, return an error
      return sendErrorResponse(res, 404, "OTP does not match or user not found.");
    }

    // OTP is correct, allow the user to reset their password
    // (in production, you would send a reset password link here)
    return sendSuccessWithoutResponse(res, "OTP is correct. You can now reset your password.");

  } catch (error: any) {
    // Handle unexpected errors and send a generic error response
    console.error("Error during password reset:", error.message);
    return sendErrorResponse(res, 500, "An error occurred while processing the password reset request.");
  }
};

export default CheckOtpPassword;
