import bcrypt from "bcryptjs";
import mysql from "mysql2/promise";
import db from "../models/index.js";

const salt = bcrypt.genSaltSync(10);

const hashPassword = (password) => {
  return bcrypt.hashSync(password, salt);
};

const handleCreateUser = async (email, password, username) => {
  let hash = hashPassword(password);

  await db.User.create({
    email: email,
    password: hash,
    username: username,
  });
};

const getUserList = async () => {
  let users = await db.User.findAll({
    where: { id: 1 },
    include: { model: db.Group, attributes: ["id", "name", "description"] },
    attributes: ["id", "email", "username"],
    raw: true,
    nest: true,
  });

  let roles = await db.Group.findAll({
    where: { id: 1 },
    include: { model: db.Role, attributes: ["id", "url", "description"] },
    attributes: ["id", "name", "description"],
    raw: true,
    nest: true,
  });

  console.log(">>> check user list: ", users);
  console.log(">>> check roles: ", roles);

  return await db.User.findAll();
};

const deleteUser = async (id) => {
  await db.User.destroy({
    where: {
      id: id,
    },
  });
};

const getUserById = async (id) => {
  let user = {};
  user = await db.User.findOne({
    where: {
      id: id,
    },
  });
  return user;
};

const UpdateUser = async (id, email, username) => {
  await db.User.update(
    { email: email, username: username },
    {
      where: {
        id: id,
      },
    },
  );
};

module.exports = {
  handleCreateUser,
  getUserList,
  UpdateUser,
  deleteUser,
  getUserById,
};
