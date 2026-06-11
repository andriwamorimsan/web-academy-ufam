import type { Produto } from "../interfaces/Produto.js";

export class Carrinho<T extends Produto> {

  private produtos: T[] = [];

  adicionarProduto(produto: T): void {
    this.produtos.push(produto);
  }

  getTotalCarrinho(): number {
    return this.produtos.reduce(
      (acc, produto) => acc + produto.valor,
      0
    );
  }

  getQuantidadeProdutos(): number {
    return this.produtos.length;
  }

  getProdutos(): T[] {
    return [...this.produtos];
  }

  exibirCarrinho(): void {

    console.log("\n===== CARRINHO =====");

    this.produtos.forEach((produto, index) => {
      console.log(`
[${index + 1}]
Modelo: ${produto.modelo}
Fabricante: ${produto.fabricante}
Valor: R$ ${produto.valor}
`);
    });

    console.log(
      "Quantidade:",
      this.getQuantidadeProdutos()
    );

    console.log(
      "Total: R$",
      this.getTotalCarrinho().toFixed(2)
    );
  }
}
