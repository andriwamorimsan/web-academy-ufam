import { PrismaClient } from '@prisma/client';
import { hashPassword } from '../src/resources/user/user.utils';

const prisma = new PrismaClient();

async function main() {
  const commonType = await prisma.userType.upsert({
    where: { name: 'common' },
    update: {},
    create: { id: 1, name: 'common' },
  });

  const adminType = await prisma.userType.upsert({
    where: { name: 'admin' },
    update: {},
    create: { id: 2, name: 'admin' },
  });

  await prisma.user.upsert({
    where: { email: 'cliente@expapi.local' },
    update: {
      name: 'Cliente Web Academy',
      userTypeId: commonType.id,
    },
    create: {
      name: 'Cliente Web Academy',
      email: 'cliente@expapi.local',
      password: await hashPassword('cliente123'),
      userTypeId: commonType.id,
    },
  });

  await prisma.user.upsert({
    where: { email: 'admin@expapi.local' },
    update: {
      name: 'Admin ExpApi UFAM',
      userTypeId: adminType.id,
    },
    create: {
      name: 'Admin ExpApi UFAM',
      email: 'admin@expapi.local',
      password: await hashPassword('admin123'),
      userTypeId: adminType.id,
    },
  });

  const products = [
    {
      id: 1,
      name: 'Caderno de Algoritmos',
      description: 'Caderno universitario para anotacoes das aulas de API.',
      price: 24.9,
      stock: 35,
    },
    {
      id: 2,
      name: 'Caneca Web Academy',
      description: 'Caneca personalizada para acompanhar os estudos.',
      price: 39.5,
      stock: 18,
    },
    {
      id: 3,
      name: 'Mouse USB Compacto',
      description: 'Mouse simples para laboratorio e home office.',
      price: 59.9,
      stock: 12,
    },
  ];

  for (const product of products) {
    await prisma.product.upsert({
      where: { id: product.id },
      update: product,
      create: product,
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
