import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { GameUserModel } from "../../model/UserModel/gameUser";
import {
  sendErrorResponse,
  sendSuccessWithoutResponse,
} from "../../utils/responseFun";

const ResetPassword = async (req: Request, res: Response) => {
  try {
    const { password, email } = req.body;

    // Step 1: Validate the input
    if (!email || !password) {
      return sendErrorResponse(res, 400, "Email and password are required.");
    }

    // Step 2: Check if the email format is valid
    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    if (!emailRegex.test(email)) {
      return sendErrorResponse(res, 400, "Invalid email format.");
    }

    // Step 3: Check if password meets minimum criteria (at least 8 characters)
    if (password.length < 8) {
      return sendErrorResponse(res, 400, "Password must be at least 8 characters long.");
    }

    // Step 4: Find the user by email
    const user = await GameUserModel.findOne({ email });
    if (!user) {
      return sendErrorResponse(res, 404, "User not found.");
    }

    // Step 5: Hash the new password
    const hashedPassword = await bcrypt.hash(password, 12); // Use a higher salt rounds for security

    // Step 6: Update the user's password
    await GameUserModel.updateOne(
      { email },
      { $set: { password: hashedPassword } }
    );

    // Step 7: Send success response
    return sendSuccessWithoutResponse(res, "Password reset successfully.");
  } catch (error) {
    console.error("Error resetting password:", error);
    return sendErrorResponse(
      res,
      500,
      "An error occurred while resetting the password."
    );
  }
};

export default ResetPassword;
