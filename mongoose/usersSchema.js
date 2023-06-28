import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
    firstName: String,
    lastName: String,
    profilePhoto: String,
    email: { type: String },
    zipcode: String,
    accountType: {
      type: String,
      enum: ["PERSONAL", "ADMIN"],
      default: "PERSONAL",
    },
    dateOfBirth: Date,
    joined: Date,
    followings: Number,
    followers: Number,
    thingsILove: String,
    bussinessId: String,
  },
  { collection: "users" }
);

export default userSchema;
