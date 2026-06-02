type Lembrete = [
  titulo: string,
  dataInsercao: string,
  dataLimite: string | undefined,
  descricao: string | undefined
];

let lembretes: Lembrete[] = [];

function criarLembrete(
  titulo: string,
  dataLimite?: string,
  descricao?: string
): void {

  const novoLembrete: Lembrete = [
    titulo,
    new Date().toLocaleString(),
    dataLimite,
    descricao
  ];

  lembretes.push(novoLembrete);

  console.log("Lembrete criado!");
}

function listarLembretes(): void {

  console.log("\n===== LEMBRETES =====");

  lembretes.forEach((item, index) => {
    console.log(`
[${index}]
Título: ${item[0]}
Data Inserção: ${item[1]}
Data Limite: ${item[2] ?? "Não definida"}
Descrição: ${item[3] ?? "Sem descrição"}
`);
  });
}

function editarLembrete(
  index: number,
  novoTitulo: string,
  novaDataLimite?: string,
  novaDescricao?: string
): void {

  if (!lembretes[index]) {
    console.log("Lembrete não encontrado");
    return;
  }

  lembretes[index] = [
    novoTitulo,
    lembretes[index][1],
    novaDataLimite,
    novaDescricao
  ];

  console.log("Lembrete editado!");
}

function apagarLembrete(index: number): void {

  if (!lembretes[index]) {
    console.log("Lembrete não encontrado");
    return;
  }

  lembretes.splice(index, 1);

  console.log("Lembrete removido!");
}

criarLembrete(
  "Estudar TypeScript",
  "10/06/2026",
  "Revisar tipos e tuplas"
);

criarLembrete(
  "Estudar Programação Funcional",
  "11/06/2026",
  "Revisar funções de alta ordem"
);

listarLembretes();

editarLembrete(
  0,
  "Estudar TypeScript Avançado",
  "15/06/2026",
  "Revisar interfaces"
);
editarLembrete(
  1,
  "Estudar programação funcional avançada",
  "12/06/2026",
  "Revisar interfaces"
);

listarLembretes();

apagarLembrete(1);

listarLembretes();