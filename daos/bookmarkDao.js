import bookmarkModel from "../models/bookmarkModel.js";

export const findAllBookmarkByUser = (uid) =>
  bookmarkModel.find({ bookmarkedBy: uid });

export const userBookmarkBusiness = (bookmark) =>
  bookmarkModel.create(bookmark, (err, data) => {
    if (err) {
      console.log("ERROR happened at userBookmarkBusiness:");
      console.log(err);
    } else {
      return data;
    }
  });

export const userDeleteBookmarkedBusiness = (uid, bid) =>
  bookmarkModel.deleteOne({ businessId: bid, bookmarkedBy: uid });

export const userBookmarkedBusinessOrNot = (uid, bid) =>
  bookmarkModel.findOne({ businessId: bid, bookmarkedBy: uid });
