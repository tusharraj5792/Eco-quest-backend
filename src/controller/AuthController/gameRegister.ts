import { Response, Request } from "express";
import bcrypt from "bcrypt";
import {
  sendErrorResponse,
  sendSuccessResponse,
  sendSuccessWithoutResponse,
} from "../../utils/responseFun"; // Assuming sendSuccessResponse is defined properly
import { GameUserModel } from "../../model/UserModel/gameUser";

const registerGameUser = async (req: Request, res: Response) => {
  try {
    const { email, password, userName } = req.body;

    // Validate request body
    if (!email || !password || !userName) {
      return sendErrorResponse(res, 400, "All fields (email, password, userName) are required.");
    }

    // Check if email is valid
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return sendErrorResponse(res, 400, "Please provide a valid email address.");
    }

    // Check if the email already exists
    const existingUser = await GameUserModel.findOne({ email });
    if (existingUser) {
      return sendErrorResponse(
        res,
        409,
        "An account with this email already exists. Please use a different email."
      );
    }

    // Check if username already exists
    const existingUserName = await GameUserModel.findOne({ userName });
    if (existingUserName) {
      return sendErrorResponse(
        res,
        409,
        "This username is already taken. Please choose a different username."
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user object
    const newUser = new GameUserModel({
      email,
      userName,
      password: hashedPassword,
    });

    // Save the new user to the database
    await newUser.save();

    // Send success response
    return sendSuccessWithoutResponse(res, "User registered successfully.");
  } catch (error: any) {
    console.error("Error in registerGameUser:", error.message || error);

    // Handle any unexpected errors
    return sendErrorResponse(
      res,
      500,
      "An error occurred while registering the user. Please try again later."
    );
  }
};

export default registerGameUser;
