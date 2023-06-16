import * as reviewsDao from "../daos/reviewsDao.js";

const createReview = async (req, res) => {
  const newReview = req.body;
  // newReview.reviewTime = new Date().toLocaleString();
  newReview.reviewTime = new Date("2022/12/13 15:01:00");
  const insertedReview = await reviewsDao.createReview(newReview);
  res.json(insertedReview);
};

const findReviews = async (req, res) => {
  try {
    const reviews = await reviewsDao.findReviews();
    res.json(reviews);
  } catch (err) {
    res.send(503);
  }
};

const findUsersAllReviews = async (req, res) => {
  let uid = req.params.uid;
  const reviews = await reviewsDao.findUsersAllReviews(uid);
  res.json(reviews);
};

const findBusinessAllReviews = async (req, res) => {
  let bid = req.params.bid;
  const reviews = await reviewsDao.findBusinessAllReviews(bid);
  res.json(reviews);
};

const deleteReview = async (req, res) => {
  let bid = req.params.bid;
  const status = await reviewsDao.deleteReview(bid);
  res.json(status);
};

export default (app) => {
  app.post("/api/reviews", createReview);
  app.get("/api/reviews", findReviews);
  app.get("/api/users/:uid/reviews", findUsersAllReviews);
  app.get("/api/business/:bid/reviews", findBusinessAllReviews);
  app.delete("/api/reviews/:bid", deleteReview);
};
