import jwt from "jsonwebtoken";
import logger from "../winston/logger.js";

function verifyToken(req, res, next) {
  const token = req.headers["authorization"].split(" ");

  if (!token) {
    return res.status(401).json({
      error: "Access denied",
    });
  }
  try {
    if (token[0] !== "Bearer") {
      return res.status(401).send("invalid request");
    } else {
      const decoded = jwt.verify(token[1], process.env.SECRET_KEY);
      req.userId = decoded.userId;
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(401).json({
      error: "Invalid token",
    });
  }
}

export default verifyToken;
