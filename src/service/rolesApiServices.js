import { where } from "sequelize/lib/sequelize";
import db from "../models/index";
import _ from "lodash";

const createRole = async (roles) => {
  try {
    let currentRoles = await db.Role.findAll({
      attributes: ["url", "description"],
      raw: true,
    });

    let results = roles.filter(
      ({ url: id1 }) => !currentRoles.some(({ url: id2 }) => id2 === id1),
    );
    if (results && results.length > 0) {
      await db.Role.bulkCreate(results);
      return {
        EM: `Add ${results.length} role successfully...`,
        EC: "0",
        DT: [],
      };
    }
    return {
      EM: "Nothing add role ",
      EC: "-1",
      DT: [],
    };
  } catch (error) {
    console.log("Error from roleUser: ", error);
    return {
      EM: "Error occurred while creating role",
      EC: "-1",
      DT: [],
    };
  }
};

const getAllRoles = async () => {
  try {
    let data = await db.Role.findAll({
      attributes: ["id", "url", "description"],
    });
    return {
      EM: "Get all role success",
      EC: "0",
      DT: data,
    };
  } catch (error) {
    console.log("Error from roleUser: ", error);
    return {
      EM: "Error occurred while get all role",
      EC: "-1",
      DT: [],
    };
  }
};

const deleteRole = async (id) => {
  try {
    let role = await db.Role.findOne({
      where: { id: id },
    });
    await role.destroy();
    return {
      EM: "Delete role success",
      EC: "0",
      DT: [],
    };
  } catch (error) {
    console.log("Error from roleUser: ", error);
    return {
      EM: "Error occurred while delete role",
      EC: "-1",
      DT: [],
    };
  }
};

const getRoleByGroup = async (id) => {
  try {
    if (!id) {
      return {
        EM: "Not found any Roles",
        EC: "-1",
        DT: [],
      };
    }
    let roles = await db.Group.findOne({
      where: {
        id: id,
      },
      attributes: ["id", "name", "description"],
      include: {
        model: db.Role,
        attributes: ["id", "url", "description"],
        through: { attributes: [] },
      },
    });
    return {
      EM: "get role by group success",
      EC: "0",
      DT: roles,
    };
  } catch (error) {
    console.log("Error from roleUser: ", error);
    return {
      EM: "Error occurred while get role by group",
      EC: "-1",
      DT: [],
    };
  }
};

const assignRoleToGroup = async (data) => {
  try {
    await db.Group_Role.destroy({
      where: {
        groupId: +data.groupId,
      },
    });
    await db.Group_Role.bulkCreate(data.groupRoles);
    return {
      EM: "assign role to group success",
      EC: "0",
      DT: [],
    };
  } catch (error) {
    console.log("Error from assignRoleToGroup: ", error);
    return {
      EM: "Error occurred while assgin role to group",
      EC: "-1",
      DT: [],
    };
  }
};

module.exports = {
  createRole,
  getAllRoles,
  deleteRole,
  getRoleByGroup,
  assignRoleToGroup,
};
