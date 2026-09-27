import db from "../models/index";
import {
  hashPassword,
  CheckEmailExists,
  CheckPhoneExists,
} from "./LoginRegisterService.js";

const getAllUsers = async () => {
  try {
    let users = await db.User.findAll({
      include: { model: db.Group, attributes: ["id", "name", "description"] },
      attributes: ["id", "email", "username", "phone", "sex"],
      raw: true,
      nest: true,
    });
    if (users && users.length > 0) {
      return {
        EM: "Users retrieved successfully",
        EC: "0",
        DT: users,
      };
    }
  } catch (error) {
    console.log("Error from getAllUsers: ", error);
    return {
      EM: "Error occurred while fetching user data",
      EC: "-1",
      DT: [],
    };
  }
};

const getUsersWithPagination = async (page, limit) => {
  try {
    let offset = (page - 1) * limit;
    const { count, rows } = await db.User.findAndCountAll({
      offset: offset,
      limit: limit,
      include: { model: db.Group, attributes: ["id", "name", "description"] },
      attributes: [
        "id",
        "email",
        "username",
        "phone",
        "sex",
        "address",
        "groupId",
      ],
      order: [["id", "DESC"]],
    });

    let data = {
      users: rows,
      totalItems: count,
      totalPages: Math.ceil(count / limit),
    };
    return {
      EM: "Users retrieved successfully",
      EC: "0",
      DT: data,
    };
  } catch (error) {
    console.log("Error from getUsersWithPagination: ", error);
    return {
      EM: "Error occurred while fetching user data with pagination",
      EC: "-1",
      DT: [],
    };
  }
};

const deleteUser = async (userId) => {
  try {
    let user = await db.User.findOne({ where: { id: userId } });
    if (user) {
      await user.destroy();
      return {
        EM: "User deleted successfully",
        EC: "0",
        DT: [],
      };
    } else {
      return {
        EM: "User not found",
        EC: "-1",
        DT: [],
      };
    }
  } catch (error) {
    console.log("Error from deleteUser: ", error);
    return {
      EM: "Error occurred while deleting user",
      EC: "-1",
      DT: [],
    };
  }
};

const createUser = async (userData) => {
  try {
    const emailExists = await CheckEmailExists(userData.email);
    const phoneExists = await CheckPhoneExists(userData.phone);

    if (emailExists) {
      return {
        EM: "Email already exists",
        EC: "-1",
        DT: "email",
      };
    }
    if (phoneExists) {
      return {
        EM: "Phone number already exists",
        EC: "-1",
        DT: "phone",
      };
    }
    let hash = hashPassword(userData.password);
    let newUser = await db.User.create({
      ...userData,
      password: hash,
    });
    return {
      EM: "User created successfully",
      EC: "0",
      DT: newUser,
    };
  } catch (error) {
    console.log("Error from createUser: ", error);
    return {
      EM: "Error occurred while creating user",
      EC: "-1",
      DT: [],
    };
  }
};

const updateUser = async (userData) => {
  try {
    let user = await db.User.findOne({ where: { id: userData.id } });
    if (user) {
      await user.update({
        username: userData.username,
        address: userData.address,
        sex: userData.sex,
        groupId: userData.groupId,
      });
      return {
        EM: "Updated user successfully",
        EC: "0",
        DT: [],
      };
    } else {
      return {
        EM: "User not found",
        EC: "-1",
        DT: [],
      };
    }
  } catch (error) {
    console.log("Error from updateUser: ", error);
    return {
      EM: "Error occurred while updating user",
      EC: "-1",
      DT: [],
    };
  }
};

module.exports = {
  getAllUsers,
  getUsersWithPagination,
  deleteUser,
  createUser,
  updateUser,
};
