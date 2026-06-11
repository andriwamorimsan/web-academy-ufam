import type { Produto } from "../interfaces/Produto.js";

export class TV implements Produto {

  constructor(
    public modelo: string,
    public resolucao: string,
    public tamanhoPolegadas: number,
    public fabricante: string,
    public valor: number
  ) {}
}
