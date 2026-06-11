export class Turma {
    constructor(id, nome) {
        this.id = id;
        this.nome = nome;
        this.alunos = [];
    }
    adicionarAluno(aluno) {
        this.alunos.push(aluno);
        console.log("Aluno adicionado!");
        this.exibirEstatisticas();
    }
    editarAluno(id, nomeCompleto, idade, altura, peso) {
        const aluno = this.alunos.find(a => a.id === id);
        if (!aluno) {
            console.log("Aluno não encontrado!");
            return;
        }
        aluno.nomeCompleto = nomeCompleto;
        aluno.idade = idade;
        aluno.altura = altura;
        aluno.peso = peso;
        console.log("Aluno atualizado!");
        this.exibirEstatisticas();
    }
    removerAluno(id) {
        this.alunos = this.alunos.filter(aluno => aluno.id !== id);
        console.log("Aluno removido!");
        this.exibirEstatisticas();
    }
    getNumAlunos() {
        return this.alunos.length;
    }
    getAlunos() {
        return [...this.alunos];
    }
    getMediaIdades() {
        if (this.alunos.length === 0) {
            return 0;
        }
        const soma = this.alunos.reduce((acc, aluno) => acc + aluno.idade, 0);
        return soma / this.alunos.length;
    }
    getMediaAlturas() {
        if (this.alunos.length === 0) {
            return 0;
        }
        const soma = this.alunos.reduce((acc, aluno) => acc + aluno.altura, 0);
        return soma / this.alunos.length;
    }
    getMediaPesos() {
        if (this.alunos.length === 0) {
            return 0;
        }
        const soma = this.alunos.reduce((acc, aluno) => acc + aluno.peso, 0);
        return soma / this.alunos.length;
    }
    listarAlunos() {
        console.log("\n===== ALUNOS =====");
        this.alunos.forEach(aluno => {
            console.log(`
ID: ${aluno.id}
Nome: ${aluno.nomeCompleto}
Idade: ${aluno.idade}
Altura: ${aluno.altura}
Peso: ${aluno.peso}
`);
        });
    }
    exibirEstatisticas() {
        console.log("\n===== ESTATÍSTICAS =====");
        console.log("Quantidade de alunos:", this.getNumAlunos());
        console.log("Média das idades:", this.getMediaIdades().toFixed(2));
        console.log("Média das alturas:", this.getMediaAlturas().toFixed(2));
        console.log("Média dos pesos:", this.getMediaPesos().toFixed(2));
    }
}
//# sourceMappingURL=Turma.js.map