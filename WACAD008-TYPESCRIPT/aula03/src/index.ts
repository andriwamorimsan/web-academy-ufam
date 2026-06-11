import { Carrinho } from "./models/Carrinho.js";
import { TV } from "./models/TV.js";
import { Celular } from "./models/Celular.js";
import { Bicicleta } from "./models/Bicicleta.js";
import type { Produto } from "./interfaces/Produto.js";

const carrinho = new Carrinho<Produto>();

const formulario = document.querySelector<HTMLFormElement>("#form-produto");
const tipo = document.querySelector<HTMLSelectElement>("#tipo");
const modelo = document.querySelector<HTMLInputElement>("#modelo");
const fabricante = document.querySelector<HTMLInputElement>("#fabricante");
const valor = document.querySelector<HTMLInputElement>("#valor");
const resolucao = document.querySelector<HTMLInputElement>("#resolucao");
const polegadas = document.querySelector<HTMLInputElement>("#polegadas");
const memoria = document.querySelector<HTMLInputElement>("#memoria");
const aro = document.querySelector<HTMLInputElement>("#aro");
const listaProdutos = document.querySelector<HTMLDivElement>("#lista-produtos");
const quantidade = document.querySelector<HTMLSpanElement>("#quantidade");
const total = document.querySelector<HTMLSpanElement>("#total");

function formatarMoeda(valor: number): string {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}

function atualizarCampos(): void {
  const tipoSelecionado = tipo?.value;
  const camposTV = [resolucao, polegadas];
  const camposCelular = [memoria];
  const camposBicicleta = [aro];

  document.querySelectorAll<HTMLElement>(".campo-tv").forEach((campo) => {
    campo.classList.toggle("oculto", tipoSelecionado !== "tv");
  });

  document.querySelectorAll<HTMLElement>(".campo-celular").forEach((campo) => {
    campo.classList.toggle("oculto", tipoSelecionado !== "celular");
  });

  document.querySelectorAll<HTMLElement>(".campo-bicicleta").forEach((campo) => {
    campo.classList.toggle("oculto", tipoSelecionado !== "bicicleta");
  });

  camposTV.forEach((campo) => {
    if (campo) campo.required = tipoSelecionado === "tv";
  });

  camposCelular.forEach((campo) => {
    if (campo) campo.required = tipoSelecionado === "celular";
  });

  camposBicicleta.forEach((campo) => {
    if (campo) campo.required = tipoSelecionado === "bicicleta";
  });
}

function criarProduto(): Produto | null {
  if (!tipo || !modelo || !fabricante || !valor) {
    return null;
  }

  const modeloProduto = modelo.value;
  const fabricanteProduto = fabricante.value;
  const valorProduto = Number(valor.value);

  if (tipo.value === "tv" && resolucao && polegadas) {
    return new TV(
      modeloProduto,
      resolucao.value,
      Number(polegadas.value),
      fabricanteProduto,
      valorProduto
    );
  }

  if (tipo.value === "celular" && memoria) {
    return new Celular(
      modeloProduto,
      memoria.value,
      fabricanteProduto,
      valorProduto
    );
  }

  if (tipo.value === "bicicleta" && aro) {
    return new Bicicleta(
      modeloProduto,
      Number(aro.value),
      fabricanteProduto,
      valorProduto
    );
  }

  return null;
}

function getDetalhesProduto(produto: Produto): string {
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

function renderizarCarrinho(): void {
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
