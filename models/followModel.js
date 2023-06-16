import mongoose from "mongoose";
import followSchema from "../mongoose/followSchema.js";
const usersModel = mongoose.model("FollowModel", followSchema);
export default usersModel;
