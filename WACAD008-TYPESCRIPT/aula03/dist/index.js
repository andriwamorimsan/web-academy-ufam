import { Carrinho } from "./models/Carrinho.js";
import { TV } from "./models/TV.js";
import { Celular } from "./models/Celular.js";
import { Bicicleta } from "./models/Bicicleta.js";
const carrinho = new Carrinho();
const formulario = document.querySelector("#form-produto");
const tipo = document.querySelector("#tipo");
const modelo = document.querySelector("#modelo");
const fabricante = document.querySelector("#fabricante");
const valor = document.querySelector("#valor");
const resolucao = document.querySelector("#resolucao");
const polegadas = document.querySelector("#polegadas");
const memoria = document.querySelector("#memoria");
const aro = document.querySelector("#aro");
const listaProdutos = document.querySelector("#lista-produtos");
const quantidade = document.querySelector("#quantidade");
const total = document.querySelector("#total");
function formatarMoeda(valor) {
    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}
function atualizarCampos() {
    const tipoSelecionado = tipo?.value;
    const camposTV = [resolucao, polegadas];
    const camposCelular = [memoria];
    const camposBicicleta = [aro];
    document.querySelectorAll(".campo-tv").forEach((campo) => {
        campo.classList.toggle("oculto", tipoSelecionado !== "tv");
    });
    document.querySelectorAll(".campo-celular").forEach((campo) => {
        campo.classList.toggle("oculto", tipoSelecionado !== "celular");
    });
    document.querySelectorAll(".campo-bicicleta").forEach((campo) => {
        campo.classList.toggle("oculto", tipoSelecionado !== "bicicleta");
    });
    camposTV.forEach((campo) => {
        if (campo)
            campo.required = tipoSelecionado === "tv";
    });
    camposCelular.forEach((campo) => {
        if (campo)
            campo.required = tipoSelecionado === "celular";
    });
    camposBicicleta.forEach((campo) => {
        if (campo)
            campo.required = tipoSelecionado === "bicicleta";
    });
}
function criarProduto() {
    if (!tipo || !modelo || !fabricante || !valor) {
        return null;
    }
    const modeloProduto = modelo.value;
    const fabricanteProduto = fabricante.value;
    const valorProduto = Number(valor.value);
    if (tipo.value === "tv" && resolucao && polegadas) {
        return new TV(modeloProduto, resolucao.value, Number(polegadas.value), fabricanteProduto, valorProduto);
    }
    if (tipo.value === "celular" && memoria) {
        return new Celular(modeloProduto, memoria.value, fabricanteProduto, valorProduto);
    }
    if (tipo.value === "bicicleta" && aro) {
        return new Bicicleta(modeloProduto, Number(aro.value), fabricanteProduto, valorProduto);
    }
    return null;
}
function getDetalhesProduto(produto) {
    if (produto instanceof TV) {
        return `Resolucao: ${produto.resolucao} | Polegadas: ${produto.tamanhoPolegadas}`;
    }
    if (produto instanceof Celular) {
        return `Memoria: ${produto.memoria}`;
    }
    if (produto instanceof Bicicleta) {
        return `Aro: ${produto.tamanhoAro}`;
    }
    return "";
}
function renderizarCarrinho() {
    if (!listaProdutos || !quantidade || !total) {
        return;
    }
    listaProdutos.innerHTML = "";
    if (carrinho.getQuantidadeProdutos() === 0) {
        listaProdutos.innerHTML = '<p class="mensagem-vazia">Nenhum produto no carrinho.</p>';
    }
    carrinho.getProdutos().forEach((produto) => {
        const item = document.createElement("article");
        item.className = "produto";
        item.innerHTML = `
      <h2>${produto.modelo}</h2>
      <p>Fabricante: ${produto.fabricante}</p>
      <p>${getDetalhesProduto(produto)}</p>
      <strong>${formatarMoeda(produto.valor)}</strong>
    `;
        listaProdutos.appendChild(item);
    });
    quantidade.textContent = String(carrinho.getQuantidadeProdutos());
    total.textContent = formatarMoeda(carrinho.getTotalCarrinho());
}
tipo?.addEventListener("change", atualizarCampos);
formulario?.addEventListener("submit", (event) => {
    event.preventDefault();
    const produto = criarProduto();
    if (!produto) {
        return;
    }
    carrinho.adicionarProduto(produto);
    renderizarCarrinho();
    formulario.reset();
    atualizarCampos();
});
atualizarCampos();
renderizarCarrinho();
//# sourceMappingURL=index.js.map