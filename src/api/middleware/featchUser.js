const JWT = require("jsonwebtoken");

const featchUser = (req, res, next) => {
  const token = req.header("auth-token");
  const key = process.env.JWT_KEY;

  if (!token) {
    res.status(401).json({
      message: "Please authenticate using a valid token.",
    });
  } else {
    try {
      const data = JWT.verify(token, key);
      // console.log(data);
      req.user = data.user;
      next();
    } catch (err) {
      res
        .status(401)
        .json({ message: "Please authenticate using a valid token." });
    }
  }
};

module.exports = featchUser;
