import { Response, Request } from "express";
import ProductRepository from "../repositories/ProductRepository";
import { IProduct } from "../types";

class ProductController {
  async index(req: Request, res: Response) {
    try {
      const { page } = req.query;

      const data = await ProductRepository.findAll(Number(page));

      res.status(200).send(data);
    } catch (error) {
      res.status(400).send(error);
    }
  }

  async show(req: Request, res: Response) {
    try {
      const Product: IProduct = req.body;

      const response = await ProductRepository.create(Product);

      res.status(200).send({ response });
    } catch (error) {
      res.status(400).send(error);
    }
  }

  async update(req: Request, res: Response) {
    try {
      const Product: IProduct = req.body;
      const { id } = req.params;
      const response = await ProductRepository.update(Product, id);
      if (!Boolean(response)) {
        return res.status(404).send(`Product with ID ${id} not found`);
      }

      res.status(200).send({ response });
    } catch (error) {
      res.status(400).send(error);
    }
  }

  async store(req: Request, res: Response) {
    try {
      const { nome } = req.params;
      const response = await ProductRepository.findByName(nome);

      if (!Boolean(response)) {
        return res.status(404).send(`Product  with ID  ${nome} not found`);
      }
      res.status(200).send(response);
    } catch (error) {
      res.status(400).send(error);
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const response = await ProductRepository.delete(id);

      if (!Boolean(response)) {
        return res.status(404).send(`Product  with ID  ${id} not found`);
      }

      res.status(200).send({ response });
    } catch (error) {
      res.status(400).send(error);
    }
  }
}

export default new ProductController();
