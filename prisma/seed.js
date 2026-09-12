const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando Seed do Banco de Dados SQLite...');

  // Cria usuário administrador padrão
  const passwordHash = await bcrypt.hash('123456', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@email.com' },
    update: {},
    create: {
      name: 'Admin User',
      email: 'admin@email.com',
      password: passwordHash,
    },
  });

  console.log(`👤 Usuário admin configurado: ${admin.email}`);

  // Palestrantes iniciais de demonstração
  const initialTalkers = [
    {
      id: 1,
      name: 'Henrique Oliveira',
      age: 38,
      talk: { watchedAt: '22/10/2020', rate: 5 },
    },
    {
      id: 2,
      name: 'Heloísa Finley',
      age: 67,
      talk: { watchedAt: '17/08/2020', rate: 4 },
    },
    {
      id: 3,
      name: 'Ricardo Xavier',
      age: 29,
      talk: { watchedAt: '03/05/2021', rate: 5 },
    },
  ];

  for (const t of initialTalkers) {
    await prisma.talker.upsert({
      where: { id: t.id },
      update: {},
      create: {
        id: t.id,
        name: t.name,
        age: t.age,
        userId: admin.id,
        talk: {
          create: {
            watchedAt: t.talk.watchedAt,
            rate: t.talk.rate,
          },
        },
      },
    });
  }

  console.log(`✅ ${initialTalkers.length} palestrantes cadastrados com sucesso.`);
  console.log('🎉 Seed finalizado com sucesso!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
