const jwt = require("jsonwebtoken");
//const config = require("config");
const jwtSecret = process.env.JWT_SECRET;

module.exports = function (req) {
  // Get token from header
  const token = req.header("x-auth-token");

  //Check if undefined
  if (!token) {
    return "";
  }

  try {
    //const decoded = jwt.verify(token, config.get("jwtSecret"));
    const decoded = jwt.verify(token, jwtSecret);
    return decoded.user.id;
  } catch (error) {
    return "";
  }
};
