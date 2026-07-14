import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.itemCompra.deleteMany();
  await prisma.compra.deleteMany();
  await prisma.numeroSerie.deleteMany();
  await prisma.produto.deleteMany();
  await prisma.subcategoria.deleteMany();
  await prisma.categoria.deleteMany();
  await prisma.endereco.deleteMany();
  await prisma.cliente.deleteMany();

  const cliente = await prisma.cliente.create({
    data: {
      nomeCompleto: "Maria Silva Souza",
      cpf: "12345678901",
      celular: "92999990000",
      email: "maria.souza@email.com",
      dataNascimento: new Date("1998-04-20"),
      enderecos: {
        create: {
          rua: "Avenida Djalma Batista",
          numero: "1000",
          bairro: "Chapada",
          cidade: "Manaus",
          estado: "AM",
          cep: "69050010",
          complemento: "Apto 302"
        }
      }
    },
    include: {
      enderecos: true
    }
  });

  const categoria = await prisma.categoria.create({
    data: {
      nomeCategoria: "Eletronicos",
      subcategorias: {
        create: [
          { nomeSubcategoria: "Notebooks" },
          { nomeSubcategoria: "Smartphones" }
        ]
      }
    }
  });

  const notebook = await prisma.produto.create({
    data: {
      modelo: "Notebook WebAcademy Pro",
      fabricante: "UFAM Tech",
      precoBase: "4500.00",
      quantidadeDisponivel: 8,
      idCategoria: categoria.idCategoria,
      numerosSerie: {
        create: [
          { numeroSerie: "NB-WA-0001" },
          { numeroSerie: "NB-WA-0002" }
        ]
      }
    }
  });

  const smartphone = await prisma.produto.create({
    data: {
      modelo: "Smartphone Prisma X",
      fabricante: "UFAM Tech",
      precoBase: "2100.00",
      quantidadeDisponivel: 12,
      idCategoria: categoria.idCategoria,
      numerosSerie: {
        create: [{ numeroSerie: "SP-PX-0001" }]
      }
    }
  });

  await prisma.compra.create({
    data: {
      dataHora: new Date(),
      desconto: "100.00",
      formaPagamento: "cartao",
      totalCompra: "6500.00",
      idCliente: cliente.idCliente,
      idEndereco: cliente.enderecos[0].idEndereco,
      itens: {
        create: [
          {
            quantidade: 1,
            precoUnitario: "4500.00",
            subtotal: "4500.00",
            idProduto: notebook.idProduto
          },
          {
            quantidade: 1,
            precoUnitario: "2100.00",
            subtotal: "2100.00",
            idProduto: smartphone.idProduto
          }
        ]
      }
    }
  });

  console.log("Seed executado com sucesso.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
