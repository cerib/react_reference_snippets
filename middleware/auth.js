const jwt = require("jsonwebtoken");
//const config = require("config");
const jwtSecret = process.env.JWT_SECRET;

module.exports = function (req, res, next) {
  // Get token from header
  const token = req.header("x-auth-token");

  //Check if undefined
  if (!token) {
    return res.status(401).json({ msg: "No token, request denied" });
  }

  try {
    //const decoded = jwt.verify(token, config.get("jwtSecret"));
    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({ msg: "Token is not valid." });
  }
};
