export interface IProduct {
  nome: string;
  descricao: string;
  preco: number;
  id?: string;
}
export interface IUser {
  nome: string;
  email: string;
  password: string;
  id?: string;
  token: string;
}
