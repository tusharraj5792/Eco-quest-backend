import express, { Application } from "express";
import Authroutes from "./AuthRoutes/auth";




const route: Application = express();
route.use("/api/auth", Authroutes)
export default route
