type Lembrete = [
  titulo: string,
  dataInsercao: string,
  dataLimite: string | undefined,
  descricao: string | undefined
];

const lembretes: Lembrete[] = [
  ["Estudar TypeScrpt", new Date().toLocaleString("pt-BR"), "2026-06-10", "Revisar tipos e tuplas"],
  ["Estudar Programacao Funcional", new Date().toLocaleString("pt-BR"), "2026-06-11", "Revisar funcoes de alta ordem"]
];

const formulario = document.querySelector<HTMLFormElement>("#form-lembrete");
const campoTitulo = document.querySelector<HTMLInputElement>("#titulo");
const campoDataLimite = document.querySelector<HTMLInputElement>("#data-limite");
const campoDescricao = document.querySelector<HTMLTextAreaElement>("#descricao");
const campoIndice = document.querySelector<HTMLInputElement>("#indice-edicao");
const lista = document.querySelector<HTMLDivElement>("#lista-lembretes");
const botaoCancelar = document.querySelector<HTMLButtonElement>("#cancelar-edicao");

function criarLembrete(titulo: string, dataLimite?: string, descricao?: string): void {
  lembretes.push([titulo, new Date().toLocaleString("pt-BR"), dataLimite, descricao]);
}

function editarLembrete(index: number, titulo: string, dataLimite?: string, descricao?: string): void {
  const lembrete = lembretes[index];

  if (!lembrete) {
    return;
  }

  const [, dataInsercao] = lembrete;

  lembretes[index] = [titulo, dataInsercao, dataLimite, descricao];
}

function apagarLembrete(index: number): void {
  lembretes.splice(index, 1);
  renderizarLembretes();
}

function limparFormulario(): void {
  formulario?.reset();

  if (campoIndice) {
    campoIndice.value = "";
  }

  if (botaoCancelar) {
    botaoCancelar.hidden = true;
  }
}

function preencherFormulario(index: number): void {
  const lembrete = lembretes[index];

  if (!lembrete || !campoTitulo || !campoDataLimite || !campoDescricao || !campoIndice || !botaoCancelar) {
    return;
  }

  const [titulo, , dataLimite, descricao] = lembrete;

  campoTitulo.value = titulo;
  campoDataLimite.value = dataLimite ?? "";
  campoDescricao.value = descricao ?? "";
  campoIndice.value = String(index);
  botaoCancelar.hidden = false;
  campoTitulo.focus();
}

function formatarData(data?: string): string {
  if (!data) {
    return "Nao definida";
  }

  return new Date(`${data}T00:00:00`).toLocaleDateString("pt-BR");
}

function renderizarLembretes(): void {
  if (!lista) {
    return;
  }

  lista.innerHTML = "";

  if (lembretes.length === 0) {
    lista.innerHTML = '<p class="mensagem-vazia">Nenhum lembrete cadastrado.</p>';
    return;
  }

  lembretes.forEach(([titulo, dataInsercao, dataLimite, descricao], index) => {
    const item = document.createElement("article");
    item.className = "lembrete";

    item.innerHTML = `
      <div>
        <h2>${titulo}</h2>
        <p>${descricao || "Sem descricao"}</p>
        <span>Criado em: ${dataInsercao}</span>
        <span>Data limite: ${formatarData(dataLimite)}</span>
      </div>
      <div class="acoes">
        <button type="button" data-editar="${index}">Editar</button>
        <button type="button" data-apagar="${index}" class="perigo">Apagar</button>
      </div>
    `;

    lista.appendChild(item);
  });
}

formulario?.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!campoTitulo || !campoDataLimite || !campoDescricao || !campoIndice) {
    return;
  }

  const titulo = campoTitulo.value.trim();
  const dataLimite = campoDataLimite.value || undefined;
  const descricao = campoDescricao.value.trim() || undefined;
  const indiceEdicao = campoIndice.value;

  if (!titulo) {
    alert("Informe o titulo do lembrete.");
    return;
  }

  if (indiceEdicao) {
    editarLembrete(Number(indiceEdicao), titulo, dataLimite, descricao);
  } else {
    criarLembrete(titulo, dataLimite, descricao);
  }

  limparFormulario();
  renderizarLembretes();
});

lista?.addEventListener("click", (event) => {
  const elemento = event.target;

  if (!(elemento instanceof HTMLButtonElement)) {
    return;
  }

  const indiceEditar = elemento.dataset.editar;
  const indiceApagar = elemento.dataset.apagar;

  if (indiceEditar) {
    preencherFormulario(Number(indiceEditar));
  }

  if (indiceApagar) {
    apagarLembrete(Number(indiceApagar));
  }
});

botaoCancelar?.addEventListener("click", limparFormulario);

renderizarLembretes();
