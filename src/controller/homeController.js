import userService from "../service/userService.js";

const homePage = (req, res) => {
  res.render("home.ejs");
};

const userPage = async (req, res) => {
  const usersList = await userService.getUserList();
  res.render("user.ejs", { usersList });
};

const HandleCreateUser = async (req, res) => {
  let { email, password, username } = req.body;

  await userService.handleCreateUser(email, password, username);
  return res.redirect("/user");
};

const HandleDeleteUser = async (req, res) => {
  await userService.deleteUser(req.params.id);
  return res.redirect("/user");
};

const getPageUpdateUser = async (req, res) => {
  let user = await userService.getUserById(req.params.id);
  let userData = {};
  userData = user;
  res.render("update-user.ejs", { userData });
};

const HandleUpdateUser = async (req, res) => {
  let { id, email, username } = req.body;
  await userService.UpdateUser(id, email, username);
  return res.redirect("/user");
};

module.exports = {
  homePage,
  userPage,
  HandleCreateUser,
  HandleDeleteUser,
  getPageUpdateUser,
  HandleUpdateUser,
};
