import groupsApiService from "../service/groupsApiServices";

const readGroupFunc = async (req, res) => {
  try {
    let data = await groupsApiService.getAllGroups();
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      EM: "Error occurred while reading group data",
      EC: "-1",
    });
  }
};

module.exports = { readGroupFunc };
