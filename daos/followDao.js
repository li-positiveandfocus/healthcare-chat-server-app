import followModel from "../models/followModel.js";

export const findAllFollow = () => followModel.find();

export const findAllUsersThatUserFollowing = (uid) =>
  followModel.find({ userFollowing: uid }).populate("userFollowed").exec();

export const findAllUsersThatFollowingUser = (uid) =>
  followModel.find({ userFollowed: uid }).populate("userFollowing").exec();

export const userFollowsUser = (uid1, uid2) =>
  followModel.create({ userFollowing: uid1, userFollowed: uid2 });

export const userUnfollowUser = (uid1, uid2) =>
  followModel.deleteOne({ userFollowing: uid1, userFollowed: uid2 });

export const findUserFollowUser = (uid1, uid2) =>
  followModel.findOne({ userFollowing: uid1, userFollowed: uid2 });

export const countHowManyFollowers = (uid) =>
  followModel.count({ userFollowed: uid });

export const countHowManyFollowings = (uid) =>
  followModel.count({ userFollowing: uid });
