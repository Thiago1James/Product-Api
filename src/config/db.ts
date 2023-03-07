import { Client } from "pg";

const client = new Client({
  host: "localhost",
  port: 5432,
  user: "root",
  password: "example",
  database: "products",
});

client.connect();

export const Query = async (query: string, values?: Array<string | number>) => {
  const { rows } = await client.query(query, values);
  return rows;
};
