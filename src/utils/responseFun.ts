import { Response } from "express";

import jwt from "jsonwebtoken"
import { GameUserResponse } from "../types/gameUserModel";


export const sendErrorResponse = (res:Response, statusCode:number, message:string) => {
    return res.status(statusCode).json({
      status: false,
      message,
    });
  };
  export const sendSuccessResponse = (res:Response, data:any, message:string) => {
    return res.status(200).json({
      status: true,
      data: data,
      message,
    });
  };
  export const sendSuccessWithoutResponse = (res:Response, message:string) => {
    return res.status(200).json({
      status: true,
      message,
    });
  };

  export const getToken = async (email: string, user: GameUserResponse) => {
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined in environment variables.");
    }
  
    const token = jwt.sign({ identifier: user._id }, process.env.JWT_SECRET, {
      expiresIn: "90d",
    });
    return token;
  };
  
  export const generateOTP = () => {
    let digits =
      "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+";
    let OTP = "";
    for (let i = 0; i < 6; i++) {
      OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
  };