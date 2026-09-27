import db from "../models/index.js";
import bcrypt from "bcryptjs";
import { Op } from "sequelize";

const salt = bcrypt.genSaltSync(10);

const hashPassword = (password) => {
  return bcrypt.hashSync(password, salt);
};

const CheckEmailExists = async (email) => {
  let user = await db.User.findOne({
    where: { email: email },
  });
  if (user) {
    return true;
  }
  return false;
};

const CheckPhoneExists = async (phone) => {
  let user = await db.User.findOne({
    where: { phone: phone },
  });
  if (user) {
    return true;
  }
  return false;
};

const HandleRegister = async (userData) => {
  try {
    const emailExists = await CheckEmailExists(userData.email);
    const phoneExists = await CheckPhoneExists(userData.phone);

    if (emailExists) {
      return {
        EM: "Email already exists",
        EC: "-1",
      };
    }
    if (phoneExists) {
      return {
        EM: "Phone number already exists",
        EC: "-1",
      };
    }

    let hash = hashPassword(userData.password);
    const user = await db.User.create({
      ...userData,
      password: hash,
    });
    return {
      EM: "User registered successfully",
      EC: "0",
    };
  } catch (error) {
    console.error("Error occurred while registering user:", error);
    return {
      EM: "Error occurred while registering user",
      EC: "-1",
    };
  }
};

const checkPassword = (inputPassword, hashedPassword) => {
  return bcrypt.compareSync(inputPassword, hashedPassword);
};

const HandleLogin = async (userData) => {
  try {
    let user = await db.User.findOne({
      where: {
        [Op.or]: [
          { email: userData.valueLogin },
          { phone: userData.valueLogin },
        ],
      },
    });

    if (user) {
      console.log("User found with email/phone ");
      if (checkPassword(userData.password, user.password)) {
        return {
          EM: "Login successful",
          EC: "0",
        };
      }
    }

    console.log(" information: ", userData);
    return {
      EM: "Invalid email/phone or password",
      EC: "-1",
    };
  } catch (error) {
    console.error("Error occurred while logging in user:", error);
    return {
      EM: "Error occurred while logging in user",
      EC: "-1",
    };
  }
};

module.exports = {
  HandleRegister,
  HandleLogin,
  hashPassword,
  CheckEmailExists,
  CheckPhoneExists,
};
