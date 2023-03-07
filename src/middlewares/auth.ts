import jwt from "jsonwebtoken";
import { Response, Request, NextFunction } from "express";
import UserRepository from "../repositories/UserRepository";

export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers["x-access-token"] as string;

  if (!token) {
    res.status(401).json({ error: "Unauthorized: No token provided" });
  } else {
    jwt.verify(token, process.env.SECRET_BCRYPT!, async (err, decoded) => {
      if (err) {
        res.status(401).send("Unauthorized: Invalid token");
      } else {
        const user = await UserRepository.FindByEmail(decoded!.email);
        if (user) {
          next();
        } else {
          res.status(401).send("Unauthorized: Invalid token");
        }
      }
    });
  }
};
