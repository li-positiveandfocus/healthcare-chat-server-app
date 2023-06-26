import * as bookmarkDao from "../daos/bookmarkDao.js";
import { getBusinessDetails } from "../service/yelpGraphQLService.js";

const findAllBookmarkByUser = async (req, res) => {
  const bookmarks = await bookmarkDao.findAllBookmarkByUser(req.params.uid);
  const bookmarkedBusinessIds = bookmarks.map(
    (bookmark) => bookmark.businessId
  );
  const response = await getBusinessDetails(bookmarkedBusinessIds);
  res.json(response);
};

const userBookmarkBusiness = async (req, res) => {
  const newBookmark = {};
  newBookmark.businessId = req.params.bid;
  newBookmark.bookmarkedBy = req.params.uid;
  const bookmark = await bookmarkDao.userBookmarkBusiness(newBookmark);
  res.json(bookmark);
};

const userDeleteBookmarkedBusiness = async (req, res) => {
  const status = await bookmarkDao.userDeleteBookmarkedBusiness(
    req.params.uid,
    req.params.bid
  );
  res.json(status);
};

const userBookmarkedBusinessOrNot = async (req, res) => {
  const response = await bookmarkDao.userBookmarkedBusinessOrNot(
    req.params.uid,
    req.params.bid
  );
  // When not found, returns null to frontend.
  // When found, returns the found bookmark object to frontend.
  res.json(response);
};

const BookmarkController = (app) => {
  app.get("/api/users/:uid/bookmarks", findAllBookmarkByUser);
  app.post("/api/users/:uid/bookmarks/:bid", userBookmarkBusiness);
  app.delete("/api/users/:uid/bookmarks/:bid", userDeleteBookmarkedBusiness);
  // app.get("/api/users/:uid/bookmarks/:bid", userBookmarkedBusinessOrNot);
};

export default BookmarkController;
