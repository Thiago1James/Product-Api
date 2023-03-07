import { Query } from "../config/db";
import { IProduct } from "../types";
class ProductRepository {
  async findAll(page: number): Promise<IProduct[] | unknown> {
    try {
      const Pagination: number = page || 1;
      const Offset = 10 * (Pagination - 1);
      const limit = 10;
      const rows = await Query(
        `
          SELECT * 
          FROM product
          OFFSET $1
          LIMIT $2
          `,
        [Offset, limit]
      );
      const [count] = await Query(
        ` SELECT count(*)
          FROM product
          `
      );
      return {
        rows,
        Total: count,
      };
    } catch (error) {
      return error;
    }
  }
  async findById(id: string): Promise<IProduct[] | unknown> {
    try {
      const [row] = await Query(
        `SELECT * 
      FROM product
      WHERE id = $1
      `,
        [id]
      );

      return row;
    } catch (error) {
      return error;
    }
  }
  async findByName(nome: string): Promise<IProduct[] | unknown> {
    console.log(nome);
    try {
      const row = await Query(
        `SELECT * 
      FROM product
      WHERE nome::text 
      LIKE $1
      `,
        [`%${nome}%`]
      );
      const [count] = await Query(
        ` SELECT count(*)
          FROM product
          `
      );
      console.log(row);

      return {
        row,
        Total: count,
      };
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async create({
    nome,
    descricao,
    preco,
  }: IProduct): Promise<IProduct | unknown> {
    console.log(nome);
    console.log(descricao);
    console.log(preco);

    try {
      const [row] = await Query(
        `INSERT INTO product(nome,descricao,preco) 
        VALUES($1,$2,$3)
        RETURNING *
        `,
        [nome, descricao, preco]
      );
      return row;
    } catch (error) {
      return error;
    }
  }
  async update(product: IProduct, id: string): Promise<IProduct | unknown> {
    try {
      const [row] = await Query(
        `UPDATE product
        SET nome = $1, descricao = $2, preco = $3
        WHERE id = $4
        RETURNING *
        `,
        [product.nome, product.descricao, product.preco, id]
      );
      console.log(row);
      return row;
    } catch (error) {
      return error;
    }
  }

  async delete(id: string): Promise<IProduct | unknown> {
    try {
      const [row] = await Query(
        `DELETE FROM product
          WHERE id = $1
          RETURNING *
        `,
        [id]
      );
      return row;
    } catch (error) {
      return error;
    }
  }
}

export default new ProductRepository();
