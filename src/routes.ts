import { Router } from "express";
import ProductController from "./controllers/ProductController";
import UserController from "./controllers/UserController";
import { isAuthenticated } from "./middlewares/auth";
import { Bcrypt, BcryptCompare } from "./middlewares/bcrypt";

const routes = Router();

routes.get("/products", ProductController.index);
routes.post("/products", isAuthenticated, ProductController.show);
routes.put("/products/:id", ProductController.update);
routes.get("/products/:nome", ProductController.store);
routes.delete(
  "/products/:id",
  isAuthenticated,
  ProductController.delete
);

routes.get("/users", UserController.index);
routes.post("/users", Bcrypt, UserController.show);
routes.post("/users/login", BcryptCompare, UserController.login);

export default routes;
