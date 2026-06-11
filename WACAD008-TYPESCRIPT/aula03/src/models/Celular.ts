import type { Produto } from "../interfaces/Produto.js";

export class Celular implements Produto {

  constructor(
    public modelo: string,
    public memoria: string,
    public fabricante: string,
    public valor: number
  ) {}
}
