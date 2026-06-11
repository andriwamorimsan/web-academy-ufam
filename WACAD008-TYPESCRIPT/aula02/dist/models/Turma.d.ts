import { Aluno } from "./Aluno.js";
export declare class Turma {
    id: number;
    nome: string;
    private alunos;
    constructor(id: number, nome: string);
    adicionarAluno(aluno: Aluno): void;
    editarAluno(id: number, nomeCompleto: string, idade: number, altura: number, peso: number): void;
    removerAluno(id: number): void;
    getNumAlunos(): number;
    getAlunos(): Aluno[];
    getMediaIdades(): number;
    getMediaAlturas(): number;
    getMediaPesos(): number;
    listarAlunos(): void;
    exibirEstatisticas(): void;
}
//# sourceMappingURL=Turma.d.ts.map