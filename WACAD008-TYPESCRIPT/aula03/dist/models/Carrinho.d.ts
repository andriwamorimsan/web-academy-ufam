import type { Produto } from "../interfaces/Produto.js";
export declare class Carrinho<T extends Produto> {
    private produtos;
    adicionarProduto(produto: T): void;
    getTotalCarrinho(): number;
    getQuantidadeProdutos(): number;
    getProdutos(): T[];
    exibirCarrinho(): void;
}
//# sourceMappingURL=Carrinho.d.ts.map