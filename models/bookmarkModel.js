import mongoose from "mongoose";
import bookmarkSchema from "../mongoose/bookmarkSchema.js";
const bookmarkModel = mongoose.model("BookmarkModel", bookmarkSchema);

export default bookmarkModel;
