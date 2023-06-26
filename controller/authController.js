import mongoose from "mongoose";
import bcrypt from "bcrypt";
import * as usersDao from "../daos/usersDao.js";
const saltRounds = 10;

const signup = async (req, res) => {
  const newUser = req.body;
  const password = newUser.password;
  const accountType = newUser.accountType;
  const hash = await bcrypt.hash(password, saltRounds);

  newUser.password = hash;

  const existingUser = await usersDao.findUserByUsername(req.body.username);
  if (existingUser) {
    //already sign up
    res.sendStatus(403);
    return;
  } else {
    const insertedUser = await usersDao.createUser(newUser);
    // insertedUser.password = "";
    req.session["profile"] = insertedUser;
    res.json(insertedUser);
  }
};

const profile = (req, res) => {
  const profile = req.session["profile"];
  console.log(profile);
  if (profile) {
    profile.password = "";
    res.json(profile);
  } else {
    res.sendStatus(403);
  }
};

const logout = (req, res) => {
  req.session.destroy();
  res.sendStatus(200);
};

const login = async (req, res) => {
  const user = req.body;
  const username = user.username;
  const password = user.password;
  const existingUser = await usersDao.findUserByUsername(username);

  if (!existingUser) {
    res.sendStatus(403);
    return;
  }

  const match = await bcrypt.compare(password, existingUser.password);

  if (match) {
    existingUser.password = "*****";
    req.session["profile"] = existingUser;
    res.json(existingUser);
  } else {
    res.sendStatus(403);
  }
};

const AuthController = (app) => {
  app.post("/api/auth/signup", signup);
  app.post("/api/auth/profile", profile);
  app.post("/api/auth/logout", logout);
  app.post("/api/auth/login", login);
};

export default AuthController;
