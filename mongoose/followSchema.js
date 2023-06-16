import mongoose, { Schema } from "mongoose";

const followSchema = new mongoose.Schema(
  {
    userFollowed: { type: Schema.Types.ObjectId, ref: "UserModel" },
    userFollowing: { type: Schema.Types.ObjectId, ref: "UserModel" },
  },
  { collection: "follows" }
);

export default followSchema;
