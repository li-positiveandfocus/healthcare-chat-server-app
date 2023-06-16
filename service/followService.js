import * as followDao from "../daos/followDao.js";

export const getSingleFollowedUser = async (uid1, user) => {
  let isFollow = null;
  if (user !== null) {
    isFollow = await followDao.findUserFollowUser(uid1, user._id);
  }

  let newUser = user.toObject();

  if (isFollow) {
    newUser = { ...newUser, followedByMe: true };
  } else {
    newUser = { ...newUser, followedByMe: false };
  }

  return newUser;
};
