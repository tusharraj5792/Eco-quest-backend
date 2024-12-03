import { Request, Response } from "express";
import { generateOTP, sendErrorResponse, sendSuccessWithoutResponse } from "../../utils/responseFun";
import { GameUserModel } from "../../model/UserModel/gameUser";
import ResetPasswordEmail from "../../middleware/email/forgotPasswordEmail";
import { GameUserResponse } from "../../types/gameUserModel";


const ForgotPassword = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { email } = req.body;

    // Check if the user with the provided email exists
    const user:GameUserResponse |null = await GameUserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }
    // Create a reset link and send it in the response (in production, you would email this link)
    const OptResetPassword = generateOTP()
    await GameUserModel.updateOne({email} ,{$set:{optResetPassword:OptResetPassword}})
    await ResetPasswordEmail(user, OptResetPassword,res)
    return sendSuccessWithoutResponse(res,"Reset Password Mail Sent to Your Email")
  } catch (error) {
    console.error("Error during password reset:", error);
    return sendErrorResponse(res, 500, "An error occurred while processing the password reset request.")
  }
};

export default ForgotPassword;
