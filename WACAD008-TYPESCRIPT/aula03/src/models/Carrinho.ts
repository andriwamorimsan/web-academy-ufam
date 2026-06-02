import { Produto } from "../interfaces/Produto";

export class Carrinho<T extends Produto> {

  private produtos: T[] = [];

  adicionarProduto(produto: T): void {
    this.produtos.push(produto);

    console.log("\nProduto adicionado!");
    this.exibirCarrinho();
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