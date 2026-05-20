const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const key = process.env.JWT_SECRET_KEY;

const fetchusers = (req, res, next) => {
  const authHeader = req.header("Authorization");
  if (!authHeader) {
    return res.status(401).json({ message: "No token. Request denied." });
  }
  try {
    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Token missing." });
    }

    const verifyToken = jwt.verify(token, key);
    req.user = verifyToken.id;
    next();
  } catch (error) {
    console.log(error.message);
    return res.status(401).json({ message: "Invalid token." });
  }
};

module.exports = fetchusers;
