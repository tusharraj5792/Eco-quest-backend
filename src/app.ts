require("dotenv").config();
import express, { Application } from "express";
import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt, StrategyOptions } from "passport-jwt";
import { JwtPayload } from "./types/commonModel";
import connectToDatabase from "./Database/mongoDb";
import route from "./routes/routes";
import { GameUserModel } from "./model/UserModel/gameUser";
import { GameUserResponse } from "./types/gameUserModel";
const cors = require("cors");
// instantize an app from express() function
const app: Application = express();
//Add Cors Policies
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:5174",
    ],
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);
express.json({ limit: "50mb" });
const opts: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET as string, // Ensure JWT_SECRET is defined in your environment variables
};

passport.use(
  new JwtStrategy(opts, async (jwt_payload: JwtPayload, done) => {
    try {
      let user:GameUserResponse | null = await GameUserModel.findOne({ _id: jwt_payload.identifier });

      if (user ) {
        return done(null, user);
      } else {
        return done(null, false);
        // or you could create a new account
      }
    } catch (error) {
      return done(error, false);
    }
  })
);
app.use(express.json());
app.use(express.urlencoded({ limit: "50mb", extended: true }));
//MongoDb setup
connectToDatabase();
//setup the Port
//All Rout use
app.use(route);
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log("server has started on port");
  console.log("http://localhost:" + PORT);
});
