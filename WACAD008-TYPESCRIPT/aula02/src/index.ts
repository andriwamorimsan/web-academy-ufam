import { Aluno } from "./models/Aluno";
import { Turma } from "./models/Turma";

const turma = new Turma(
  1,
  "Educação Física"
);

const aluno1 = new Aluno(
  1,
  "Andriw Amorim",
  26,
  1.75,
  78
);

turma.adicionarAluno(aluno1);

turma.listarAlunos();

// editar o aluno lembrar que o id do aluno é 1
turma.editarAluno(
  1,
  "Andriw Amorim Atualizado",
  27,
  1.78,
  80
);

turma.listarAlunos();

// deleta o aluno  lembrar que o id do aluno é 1
turma.removerAluno(1);

turma.listarAlunos();