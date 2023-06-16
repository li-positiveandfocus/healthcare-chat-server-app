import reviewsModel from "../models/reviewsModel.js";

export const findReviews = () => reviewsModel.find();

export const createReview = (review) => reviewsModel.create(review);

export const findUsersAllReviews = (uid) =>
  reviewsModel.find({ reviewByUserId: uid });

export const findBusinessAllReviews = (bid) =>
  reviewsModel.find({ businessId: bid });

export const deleteReview = (rid) => reviewsModel.deleteOne({ _id: rid });
