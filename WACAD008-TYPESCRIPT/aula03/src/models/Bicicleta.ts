import type { Produto } from "../interfaces/Produto.js";

export class Bicicleta implements Produto {

  constructor(
    public modelo: string,
    public tamanhoAro: number,
    public fabricante: string,
    public valor: number
  ) {}
}
