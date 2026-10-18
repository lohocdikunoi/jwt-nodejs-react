import usersApiService from "../service/usersApiServices";
import rolesApiServices from "../service/rolesApiServices";

const readFunc = async (req, res) => {
  try {
    let data = await rolesApiServices.getAllRoles();
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (error) {
    console.log("Error from readFunc: ", error);
    return res.status(500).json({
      EM: "Error occurred while reading user data",
      EC: "-1",
    });
  }
};
const createFunc = async (req, res) => {
  try {
    let data = await rolesApiServices.createRole(req.body);
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (error) {
    console.log("Error from createFunc: ", error);
    return res.status(500).json({
      EM: "Error occurred while creating role",
      EC: "-1",
    });
  }
};
const updateFunc = async (req, res) => {
  try {
    let data = await usersApiService.updateUser(req.body);
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (error) {
    console.log("Error from updateFunc: ", error);
    return res.status(500).json({
      EM: "Error occurred while updating user",
      EC: "-1",
    });
  }
};
const deleteFunc = async (req, res) => {
  try {
    let data = await rolesApiServices.deleteRole(req.body.id);
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (error) {
    console.log("Error from deleteFunc: ", error);
    return res.status(500).json({
      EM: "Error occurred while deleting user",
      EC: "-1",
    });
  }
};

const getRoleByGroup = async (req, res) => {
  try {
    let id = req.params.groupsId;
    let data = await rolesApiServices.getRoleByGroup(id);
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (error) {
    console.log("Error from deleteFunc: ", error);
    return res.status(500).json({
      EM: "Error occurred while get Role By Group",
      EC: "-1",
    });
  }
};

const assignRoleToGroup = async (req, res) => {
  try {
    let data = await rolesApiServices.assignRoleToGroup(req.body.data);
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (error) {
    console.log("Error from deleteFunc: ", error);
    return res.status(500).json({
      EM: "Error occurred while Assign Role To Group",
      EC: "-1",
    });
  }
};

module.exports = {
  readFunc,
  createFunc,
  updateFunc,
  deleteFunc,
  getRoleByGroup,
  assignRoleToGroup,
};
