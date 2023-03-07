import { Query } from "../config/db";
import { IProduct, IUser } from "../types";
class UserRepository {
  async findAll(): Promise<IProduct[] | unknown> {
    try {
      const users = await Query(
        ` SELECT *
          FROM usertable
          `
      );
      return users;
    } catch (error) {
      return error;
    }
  }

  async create({ nome, email, password }: IUser): Promise<IUser | unknown> {
    try {
      const [row] = await Query(
        `INSERT INTO usertable(nome,email,password) 
        VALUES($1,$2,$3)
        RETURNING *
        `,
        [nome, email, password]
      );
      return row;
    } catch (error) {
      return error;
    }
  }

  async FindByEmail(email: string): Promise<IUser | unknown> {
    const [user] = await Query(
      `SELECT * 
         FROM userTable 
         WHERE email = $1
        `,
      [email]
    );
    return user;
  }
}

export default new UserRepository();
