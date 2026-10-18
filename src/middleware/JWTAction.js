import jwt from "jsonwebtoken";
require("dotenv").config();

const nonSecurePaths = ["/register", "/login", "/logout"];

const extractTokenFromHeader = (req) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    return req.headers.authorization.split(" ")[1];
  }
  return null;
};

const createJWT = (payload) => {
  let key = process.env.JWT_SECRET;
  let token = null;
  try {
    token = jwt.sign(payload, key, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
  } catch (error) {
    console.log("Error creating JWT: ", error);
  }
  return token;
};

const verifyToken = (token) => {
  let key = process.env.JWT_SECRET;
  let data = null;
  try {
    let decoded = jwt.verify(token, key);
    data = decoded;
  } catch (error) {
    console.log("Error verifying JWT: ", error);
  }
  return data;
};

const checkUserJwtWithCookie = (req, res, next) => {
  if (nonSecurePaths.includes(req.path)) return next();
  let cookies = req.cookies;
  let tokenFromHeader = extractTokenFromHeader(req);
  if ((cookies && cookies.jwt) || tokenFromHeader) {
    let token = cookies && cookies.jwt ? cookies.jwt : tokenFromHeader;
    let data = verifyToken(token);
    if (data) {
      req.user = data;
      req.token = token;
      return next();
    } else {
      return res.status(401).json({
        EC: -1,
        EM: "Invalid token",
      });
    }
  } else {
    return res.status(401).json({
      EC: -1,
      EM: "No token provided",
    });
  }
};

const checkUserPermission = (req, res, next) => {
  if (nonSecurePaths.includes(req.path) || req.path === "/account")
    return next();
  let email = req.user.email;
  let role = req.user.roleWithGroup.Roles;
  let currentPath = req.path;
  if (!role || role.length === 0) {
    return res.status(403).json({
      EC: -1,
      EM: "Insufficient permissions",
    });
  }
  let canAccess = role.some(
    (item) => item.url === currentPath || currentPath.includes(item.url),
  );
  if (canAccess) {
    return next();
  } else {
    return res.status(403).json({
      EC: -1,
      EM: "Insufficient permissions",
    });
  }
};

module.exports = {
  createJWT,
  verifyToken,
  checkUserJwtWithCookie,
  checkUserPermission,
};
