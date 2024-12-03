import mongoose from "mongoose";
const GameUserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
    lowercase: true,
  },
  password: {
    type: String,
  },
  userName:{
    type: String,
  },
  optResetPassword:{
    type: String,
  }
});

export const GameUserModel = mongoose.model("gameUser", GameUserSchema);

