export class Carrinho {
    constructor() {
        this.produtos = [];
    }
    adicionarProduto(produto) {
        this.produtos.push(produto);
    }
    getTotalCarrinho() {
        return this.produtos.reduce((acc, produto) => acc + produto.valor, 0);
    }
    getQuantidadeProdutos() {
        return this.produtos.length;
    }
    getProdutos() {
        return [...this.produtos];
    }
    exibirCarrinho() {
        console.log("\n===== CARRINHO =====");
        this.produtos.forEach((produto, index) => {
            console.log(`
[${index + 1}]
Modelo: ${produto.modelo}
Fabricante: ${produto.fabricante}
Valor: R$ ${produto.valor}
`);
        });
        console.log("Quantidade:", this.getQuantidadeProdutos());
        console.log("Total: R$", this.getTotalCarrinho().toFixed(2));
    }
}
//# sourceMappingURL=Carrinho.js.map