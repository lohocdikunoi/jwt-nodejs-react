import usersApiService from "../service/usersApiServices";

const readFunc = async (req, res) => {
  try {
    if (req.query.page && req.query.limit) {
      let page = req.query.page;
      let limit = req.query.limit;
      let data = await usersApiService.getUsersWithPagination(+page, +limit);
      return res.status(200).json({
        EM: data.EM,
        EC: data.EC,
        DT: data.DT,
      });
    } else {
      let data = await usersApiService.getAllUsers();
      return res.status(200).json({
        EM: data.EM,
        EC: data.EC,
        DT: data.DT,
      });
    }
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
    let data = await usersApiService.createUser(req.body);
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (error) {
    console.log("Error from createFunc: ", error);
    return res.status(500).json({
      EM: "Error occurred while creating user",
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
    let data = await usersApiService.deleteUser(req.body.id);
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

module.exports = {
  readFunc,
  createFunc,
  updateFunc,
  deleteFunc,
};
