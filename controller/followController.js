import * as followDao from "../daos/followDao.js";
import * as usersDao from "../daos/usersDao.js";

const findAllFollow = async (req, res) => {
  const follows = await followDao.findAllFollow();
  res.json(follows);
};

const findAllUsersThatFollowingUser = async (req, res) => {
  let username = req.params.uid;
  let user = await usersDao.findUserByUsername(username);
  let uid = user._id;

  const users = await followDao.findAllUsersThatFollowingUser(uid);
  res.json(users);
};

const findAllUsersThatUserFollowing = async (req, res) => {
  let username = req.params.uid;
  let user = await usersDao.findUserByUsername(username);
  let uid = user._id;

  const users = await followDao.findAllUsersThatUserFollowing(uid);
  res.json(users);
};

const userFollowsUser = async (req, res) => {
  const follow = await followDao.userFollowsUser(
    req.params.uid1,
    req.params.uid2
  );
  res.json(follow);
};

const userUnfollowUser = async (req, res) => {
  const status = await followDao.userUnfollowUser(
    req.params.uid1,
    req.params.uid2
  );
  res.json(status);
};

const userTogglesUserFollows = async (req, res) => {
  const uid1 = req.params.uid1;
  const uid2 = req.params.uid2;

  try {
    const userAlreadyFollowedUser = await followDao.findUserFollowUser(
      uid1,
      uid2
    );
    console.log(userAlreadyFollowedUser);
    const howManyFollowing = await followDao.countHowManyFollowings(uid1);
    const howManyFollowers = await followDao.countHowManyFollowers(uid2);
    const user1 = await usersDao.findUserById(uid1);
    const user2 = await usersDao.findUserById(uid2);

    if (userAlreadyFollowedUser) {
      await followDao.userUnfollowUser(uid1, uid2);
      user1.followings = howManyFollowing - 1;
      user2.followers = howManyFollowers - 1;
    } else {
      await followDao.userFollowsUser(uid1, uid2);
      user1.followings = howManyFollowing + 1;
      user2.followers = howManyFollowers + 1;
    }

    await usersDao.updateUser(uid1, user1);
    await usersDao.updateUser(uid2, user2);
    res.sendStatus(200);
  } catch (e) {
    console.log(e);
    res.sendStatus(404);
  }
};

const FollowController = (app) => {
  app.get("/api/users/:uid/followings", findAllUsersThatUserFollowing);
  app.get("/api/users/:uid/followers", findAllUsersThatFollowingUser);
  app.get("/api/follows", findAllFollow);

  app.post("/api/users/:uid1/follows/:uid2", userFollowsUser);
  app.delete("/api/users/:uid1/unfollows/:uid2", userUnfollowUser);
  app.put("/api/users/:uid1/follows/:uid2", userTogglesUserFollows);
};

export default FollowController;
