import mongoose, { Schema } from "mongoose";

let bookmarkSchema = new mongoose.Schema(
  {
    businessId: { type: String, required: true },
    bookmarkedBy: {
      type: Schema.Types.ObjectId,
      ref: "UserModel",
      required: true,
    },
  },
  { collection: "bookmarks" }
);

bookmarkSchema.index(
  {
    businessId: 1,
    bookmarkedBy: 1,
  },
  { unique: true, background: true }
);

export default bookmarkSchema;
