const homePage = (req, res) => {
  res.render("home.ejs");
};

const userPage = (req, res) => {
  res.render("user.ejs");
};

module.exports = {
  homePage,
  userPage,
};
