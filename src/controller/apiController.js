import LoginRegisterService from "../service/LoginRegisterService";

const HandleRegister = async (req, res) => {
  try {
    if (
      !req.body.email ||
      !req.body.password ||
      !req.body.phone ||
      !req.body.username
    ) {
      return res.status(400).json({
        EM: "Missing required fields",
        EC: "-1",
      });
    }
    if (req.body.password && req.body.password.length < 6) {
      return res.status(400).json({
        EM: "Password must be at least 6 characters long",
        EC: "-1",
      });
    }

    let data = await LoginRegisterService.HandleRegister(req.body);

    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
    });
  } catch (error) {
    console.log("Error from HandleRegister: ", error);
    return res.status(500).json({
      EM: "Error occurred while registering user",
      EC: "-1",
    });
  }
};

const HandleLogin = async (req, res) => {
  try {
    let data = await LoginRegisterService.HandleLogin(req.body);
    if (data && data.DT && data.DT.access_token) {
      res.cookie("jwt", data.DT.access_token, { httpOnly: true });
    }
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (error) {
    console.log("Error from HandleLogin: ", error);
    return res.status(500).json({
      EM: "Error occurred while logging in user",
      EC: "-1",
    });
  }
};

const HandleLogout = async (req, res) => {
  try {
    res.clearCookie("jwt");
    return res.status(200).json({
      EM: "User logged out successfully",
      EC: "0",
    });
  } catch (error) {
    console.log("Error from HandleLogout: ", error);
    return res.status(500).json({
      EM: "Error occurred while logging out user",
      EC: "-1",
    });
  }
};

module.exports = {
  HandleLogin,
  HandleRegister,
  HandleLogout,
};
