import { Response, Request } from "express";
import ProductRepository from "../repositories/ProductRepository";
import UserRepository from "../repositories/UserRepository";
import { IUser } from "../types";
UserRepository;
class UserController {
  async index(req: Request, res: Response) {
    try {
      const users = await UserRepository.findAll();

      res.status(200).send(users);
    } catch (error) {
      res.status(400).send(error);
    }
  }

  async show(req: Request, res: Response) {
    try {
      const User: IUser = req.body;
      const response = await UserRepository.create(User);
      if (!response?.id) {
        return res.status(400).send({ error: "Email já cadastrado" });
      }

      res.status(200).send({ response });
    } catch (error) {
      res.status(400).send(error);
    }
  }

  async login(req: Request, res: Response) {
    try {
      const User: IUser = req.body;
      res.status(200).send({
        user: {
          nome: User.nome,
          email: User.email,
        },
        token: User.token,
      });
    } catch (error) {
      res.status(400).send(error);
    }
  }
}

export default new UserController();
