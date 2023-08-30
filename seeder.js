const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const users = [
    { nome: 'João', telefone: '123-456-7890' },
    { nome: 'Maria', telefone: '987-654-3210' },
    // Adicione mais dados conforme necessário
  ];

  for (const user of users) {
    await prisma.user.create({
      data: user,
    });
  }
}

main()
  .catch(e => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
