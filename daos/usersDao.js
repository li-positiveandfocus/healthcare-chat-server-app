import usersModel from "../models/usersModel.js";

export const findAllUsers = () => usersModel.find();

export const findUserById = (uid) => usersModel.findById(uid);

export const findUserByUsername = (username) =>
  usersModel.findOne({ username });

export const createUser = (user) => usersModel.create(user);

export const deleteUser = (uid) => usersModel.deleteOne({ _id: uid });

export const updateUser = (uid, user) =>
  usersModel.updateOne({ _id: uid }, { $set: user });
