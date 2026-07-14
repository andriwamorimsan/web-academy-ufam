import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function criarClienteComEndereco() {
  return prisma.cliente.upsert({
    where: { cpf: "98765432100" },
    update: {
      celular: "92988887777"
    },
    create: {
      nomeCompleto: "Joao Pereira Lima",
      cpf: "98765432100",
      celular: "92988887777",
      email: "joao.lima@email.com",
      dataNascimento: new Date("1995-09-12"),
      enderecos: {
        create: {
          rua: "Rua das Flores",
          numero: "45",
          bairro: "Centro",
          cidade: "Manaus",
          estado: "AM",
          cep: "69010000"
        }
      }
    },
    include: {
      enderecos: true
    }
  });
}

async function listarProdutosComCategoria() {
  return prisma.produto.findMany({
    orderBy: {
      modelo: "asc"
    },
    include: {
      categoria: true,
      numerosSerie: true
    }
  });
}

async function listarComprasComItens() {
  return prisma.compra.findMany({
    orderBy: {
      dataHora: "desc"
    },
    include: {
      cliente: true,
      endereco: true,
      itens: {
        include: {
          produto: true
        }
      }
    }
  });
}

async function atualizarEstoqueDoPrimeiroProduto() {
  const produto = await prisma.produto.findFirst({
    orderBy: {
      idProduto: "asc"
    }
  });

  if (!produto) {
    return null;
  }

  return prisma.produto.update({
    where: {
      idProduto: produto.idProduto
    },
    data: {
      quantidadeDisponivel: produto.quantidadeDisponivel + 1
    }
  });
}

async function main() {
  const cliente = await criarClienteComEndereco();
  const produtos = await listarProdutosComCategoria();
  const compras = await listarComprasComItens();
  const produtoAtualizado = await atualizarEstoqueDoPrimeiroProduto();

  console.log("Cliente criado/atualizado:");
  console.dir(cliente, { depth: null });

  console.log("\nProdutos cadastrados:");
  console.dir(produtos, { depth: null });

  console.log("\nCompras cadastradas:");
  console.dir(compras, { depth: null });

  console.log("\nProduto com estoque atualizado:");
  console.dir(produtoAtualizado, { depth: null });
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
