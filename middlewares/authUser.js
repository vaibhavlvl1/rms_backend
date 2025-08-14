const jwt = require("jsonwebtoken");

const authUser = (req, res, next) => {
  const token = req.cookies.token;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res
      .status(403)
      .json({ message: "Forbidden Invalid Token", status: true });
  }
};

module.exports = authUser;
