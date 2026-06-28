import { Aluno } from "./Aluno.js";

export class Turma {

  private alunos: Aluno[] = [];

  constructor(
    public id: number,
    public nome: string
  ) {}

  adicionarAluno(aluno: Aluno): void {
    this.alunos.push(aluno);
  }

  editarAluno(
    id: number,
    nomeCompleto: string,
    idade: number,
    altura: number,
    peso: number
  ): void {

    const aluno = this.alunos.find(a => a.id === id);

    if (!aluno) {
      return;
    }

    aluno.nomeCompleto = nomeCompleto;
    aluno.idade = idade;
    aluno.altura = altura;
    aluno.peso = peso;
  }

  removerAluno(id: number): void {

    this.alunos = this.alunos.filter(
      aluno => aluno.id !== id
    );
  }

  getNumAlunos(): number {
    return this.alunos.length;
  }

  getAlunos(): Aluno[] {
    return [...this.alunos];
  }

  getMediaIdades(): number {

    if (this.alunos.length === 0) {
      return 0;
    }

    const soma = this.alunos.reduce(
      (acc, aluno) => acc + aluno.idade,
      0
    );

    return soma / this.alunos.length;
  }

  getMediaAlturas(): number {

    if (this.alunos.length === 0) {
      return 0;
    }

    const soma = this.alunos.reduce(
      (acc, aluno) => acc + aluno.altura,
      0
    );

    return soma / this.alunos.length;
  }

  getMediaPesos(): number {

    if (this.alunos.length === 0) {
      return 0;
    }

    const soma = this.alunos.reduce(
      (acc, aluno) => acc + aluno.peso,
      0
    );

    return soma / this.alunos.length;
  }


}
