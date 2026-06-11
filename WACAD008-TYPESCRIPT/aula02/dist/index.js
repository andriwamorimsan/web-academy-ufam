import { Aluno } from "./models/Aluno.js";
import { Turma } from "./models/Turma.js";
const turma = new Turma(1, "Educacao Fisica");
let proximoId = 1;
const formulario = document.querySelector("#form-aluno");
const campoId = document.querySelector("#id-aluno");
const campoNome = document.querySelector("#nome");
const campoIdade = document.querySelector("#idade");
const campoAltura = document.querySelector("#altura");
const campoPeso = document.querySelector("#peso");
const listaAlunos = document.querySelector("#lista-alunos");
const botaoCancelar = document.querySelector("#cancelar-edicao");
const totalAlunos = document.querySelector("#total-alunos");
const mediaIdades = document.querySelector("#media-idades");
const mediaAlturas = document.querySelector("#media-alturas");
const mediaPesos = document.querySelector("#media-pesos");
function limparFormulario() {
    formulario?.reset();
    if (campoId) {
        campoId.value = "";
    }
    if (botaoCancelar) {
        botaoCancelar.hidden = true;
    }
}
function preencherFormulario(id) {
    const aluno = turma.getAlunos().find(item => item.id === id);
    if (!aluno || !campoId || !campoNome || !campoIdade || !campoAltura || !campoPeso || !botaoCancelar) {
        return;
    }
    campoId.value = String(aluno.id);
    campoNome.value = aluno.nomeCompleto;
    campoIdade.value = String(aluno.idade);
    campoAltura.value = String(aluno.altura);
    campoPeso.value = String(aluno.peso);
    botaoCancelar.hidden = false;
    campoNome.focus();
}
function atualizarEstatisticas() {
    if (!totalAlunos || !mediaIdades || !mediaAlturas || !mediaPesos) {
        return;
    }
    totalAlunos.textContent = String(turma.getNumAlunos());
    mediaIdades.textContent = turma.getMediaIdades().toFixed(2);
    mediaAlturas.textContent = turma.getMediaAlturas().toFixed(2);
    mediaPesos.textContent = turma.getMediaPesos().toFixed(2);
}
function renderizarAlunos() {
    if (!listaAlunos) {
        return;
    }
    const alunos = turma.getAlunos();
    listaAlunos.innerHTML = "";
    if (alunos.length === 0) {
        listaAlunos.innerHTML = '<p class="mensagem-vazia">Nenhum aluno cadastrado.</p>';
        atualizarEstatisticas();
        return;
    }
    alunos.forEach(aluno => {
        const item = document.createElement("article");
        item.className = "aluno";
        item.innerHTML = `
      <div>
        <h2>${aluno.nomeCompleto}</h2>
        <span>ID: ${aluno.id}</span>
        <span>Idade: ${aluno.idade} anos</span>
        <span>Altura: ${aluno.altura.toFixed(2)} m</span>
        <span>Peso: ${aluno.peso.toFixed(2)} kg</span>
      </div>
      <div class="acoes">
        <button type="button" data-editar="${aluno.id}">Editar</button>
        <button type="button" data-remover="${aluno.id}" class="perigo">Remover</button>
      </div>
    `;
        listaAlunos.appendChild(item);
    });
    atualizarEstatisticas();
}
formulario?.addEventListener("submit", event => {
    event.preventDefault();
    if (!campoId || !campoNome || !campoIdade || !campoAltura || !campoPeso) {
        return;
    }
    const nome = campoNome.value.trim();
    const idade = Number(campoIdade.value);
    const altura = Number(campoAltura.value);
    const peso = Number(campoPeso.value);
    if (!nome || idade <= 0 || altura <= 0 || peso <= 0) {
        alert("Preencha todos os dados do aluno corretamente.");
        return;
    }
    if (campoId.value) {
        turma.editarAluno(Number(campoId.value), nome, idade, altura, peso);
    }
    else {
        turma.adicionarAluno(new Aluno(proximoId, nome, idade, altura, peso));
        proximoId++;
    }
    limparFormulario();
    renderizarAlunos();
});
listaAlunos?.addEventListener("click", event => {
    const elemento = event.target;
    if (!(elemento instanceof HTMLButtonElement)) {
        return;
    }
    const idEditar = elemento.dataset.editar;
    const idRemover = elemento.dataset.remover;
    if (idEditar) {
        preencherFormulario(Number(idEditar));
    }
    if (idRemover) {
        turma.removerAluno(Number(idRemover));
        limparFormulario();
        renderizarAlunos();
    }
});
botaoCancelar?.addEventListener("click", limparFormulario);
renderizarAlunos();
//# sourceMappingURL=index.js.map