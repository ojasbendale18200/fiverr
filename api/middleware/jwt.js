import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export const verifyToken = (req, res, next) => {
  let check =
    req.headers?.authorization &&
    req.headers?.authorization?.startsWith("Bearer");
  if (check) {
    let token = req.headers?.authorization?.split(" ")[1];

    if (!token) return next(res.status(401).send("You are not authenticated!"));
    jwt.verify(token, process.env.JWT_KEY, async (err, payload) => {
      if (err) return next(res.status(403).send("Token is not valid!"));

      req.userId = payload.id;
      req.isSeller = payload.isSeller;
      next();
    });
  } else {
    res.status(401).send("You error!");
  }
};
