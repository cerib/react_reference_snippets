module.exports = function (req, res, next) {
  // Get token from header
  const user = req.user;

  //Check if undefined
  if (!user) {
    return res.status(401).json({ msg: "No user, middleware error" });
  }

  try {
    if (user.id === "5f03657173c5a6001709c473") {
      console.error("user denied write permissions");
      res.status(403).json({ msg: "You're using a read only account" });
    } else {
      next();
    }
  } catch (error) {
    res.status(401).json({ msg: "No user, middleware error" });
  }
};
