import bcrypt from "bcrypt";
import { Response, Request, NextFunction } from "express";
import jwt from "jsonwebtoken";
import UserRepository from "../repositories/UserRepository";
import { IUser } from "../types";

export const Bcrypt = (req: Request, res: Response, next: NextFunction) => {
  bcrypt.hash(req.body.password, 5, (err, data) => {
    if (data) {
      req.body.password = data;
      next();
    }
  });
};

export const BcryptCompare = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { password, email, name } = req.body;

  const user = (await UserRepository.FindByEmail(email)) as IUser;
  if (!user) return res.status(401).json({ error: "User Not Found" });

  bcrypt.compare(password, user.password, (err, same) => {
    if (!same)
      return res.status(401).json({ error: "Incorrect email or password" });

    if (same) {
      const token = jwt.sign(
        { email: user.email },
        process.env.SECRET_BCRYPT!,
        {
          expiresIn: "10h",
        }
      );
      req.body.token = token;
      req.body.nome = user.nome

      next();
    }
  });
};
