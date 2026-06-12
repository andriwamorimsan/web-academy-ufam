const lembretes = [
    ["Estudar TypeScript", new Date().toLocaleString("pt-BR"), "2026-06-10", "Revisar tipos e tuplas"],
    ["Estudar Programacao Funcional", new Date().toLocaleString("pt-BR"), "2026-06-11", "Revisar funcoes de alta ordem"]
];
const formulario = document.querySelector("#form-lembrete");
const campoTitulo = document.querySelector("#titulo");
const campoDataLimite = document.querySelector("#data-limite");
const campoDescricao = document.querySelector("#descricao");
const campoIndice = document.querySelector("#indice-edicao");
const lista = document.querySelector("#lista-lembretes");
const botaoCancelar = document.querySelector("#cancelar-edicao");
function criarLembrete(titulo, dataLimite, descricao) {
    lembretes.push([titulo, new Date().toLocaleString("pt-BR"), dataLimite, descricao]);
}
function editarLembrete(index, titulo, dataLimite, descricao) {
    const lembrete = lembretes[index];
    if (!lembrete) {
        return;
    }
    const [, dataInsercao] = lembrete;
    lembretes[index] = [titulo, dataInsercao, dataLimite, descricao];
}
function apagarLembrete(index) {
    lembretes.splice(index, 1);
    renderizarLembretes();
}
function limparFormulario() {
    formulario?.reset();
    if (campoIndice) {
        campoIndice.value = "";
    }
    if (botaoCancelar) {
        botaoCancelar.hidden = true;
    }
}
function preencherFormulario(index) {
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
function formatarData(data) {
    if (!data) {
        return "Nao definida";
    }
    return new Date(`${data}T00:00:00`).toLocaleDateString("pt-BR");
}
function renderizarLembretes() {
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
    }
    else {
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
export {};
//# sourceMappingURL=index.js.map