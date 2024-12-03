import express, { Application } from "express";
import ForgotPassword from "../../controller/AuthController/forgotPassword";
import ResetPassword from "../../controller/AuthController/resetPassword";
import loginUser from "../../controller/AuthController/loginUser";
import registerGameUser from "../../controller/AuthController/gameRegister";
import CheckOtpPassword from "../../controller/AuthController/checkotpPassword";

const Authroutes: Application = express();
Authroutes.post("/register-game", registerGameUser);
Authroutes.post("/login-game", loginUser);
Authroutes.post("/forgot-password", ForgotPassword);
Authroutes.post("/check-otp", CheckOtpPassword);
Authroutes.post("/reset-password", ResetPassword);

export default Authroutes;
