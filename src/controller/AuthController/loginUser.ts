import { Response, Request } from "express";
import bcrypt from "bcrypt";
import {
    getToken,
    sendErrorResponse,
    sendSuccessResponse,
} from "../../utils/responseFun";
import { GameUserModel } from "../../model/UserModel/gameUser";
import { GameUserResponse } from "../../types/gameUserModel";


const loginUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const gameUser = (await GameUserModel.findOne({ email })) as GameUserResponse | null;

        if (!gameUser) {
            return sendErrorResponse(res, 403, "Invalid email. No account found.");
        }

        // Verify password for gameUser
        const isPasswordValid = await bcrypt.compare(password, gameUser.password);
        if (!isPasswordValid) {
            return sendErrorResponse(res, 403, "Invalid password.");
        }

        // Generate JWT token for gameUser
        const token = await getToken(gameUser.email, gameUser);

        // Response data for gameUser
        const gameUserData = {
            _id: gameUser._id,
            email: gameUser.email,
            token,
        };

        return sendSuccessResponse(res, gameUserData, "Login successful.");
    } catch (error) {
        console.error("Error during login:", error);
        return sendErrorResponse(res, 500, "An error occurred while logging in.");
    }
};

export default loginUser;
