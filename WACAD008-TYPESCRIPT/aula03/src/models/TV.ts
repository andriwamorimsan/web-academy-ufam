import { Produto } from "../interfaces/Produto";

export class TV implements Produto {

  constructor(
    public modelo: string,
    public resolucao: string,
    public tamanhoPolegadas: number,
    public fabricante: string,
    public valor: number
  ) {}
}