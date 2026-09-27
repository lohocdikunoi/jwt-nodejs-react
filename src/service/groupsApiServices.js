import db from "../models/index.js";

const getAllGroups = async () => {
  try {
    let groups = await db.Group.findAll({
      order: [["name", "ASC"]],
      raw: true,
      nest: true,
    });
    return {
      EM: "Fetch group data successfully",
      EC: "0",
      DT: groups,
    };
  } catch (error) {
    console.log(error);
    return {
      EM: "Error occurred while fetching group data",
      EC: "-1",
      DT: [],
    };
  }
};

module.exports = { getAllGroups };
