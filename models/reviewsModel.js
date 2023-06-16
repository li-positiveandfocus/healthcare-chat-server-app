import mongoose from "mongoose";
import reviewsSchema from "../mongoose/reviewsSchema.js";

const reviewsModel = mongoose.model("ReviewModel", reviewsSchema);
export default reviewsModel;
