import { Produto } from "../interfaces/Produto";

export class Bicicleta implements Produto {

  constructor(
    public modelo: string,
    public tamanhoAro: number,
    public fabricante: string,
    public valor: number
  ) {}
}