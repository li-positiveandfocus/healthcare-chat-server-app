import mongoose from "mongoose";
import userSchema from "../mongoose/usersSchema.js";
const usersModel = mongoose.model("UserModel", userSchema);
export default usersModel;
