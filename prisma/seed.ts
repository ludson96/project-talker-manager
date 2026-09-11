import { prisma } from '../src/database/prisma';
import bcrypt from 'bcryptjs';
import fs from 'fs';
import path from 'path';

async function main() {
  console.log('🌱 Iniciando Seed do Banco de Dados...');

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

  // Se houver arquivo legado talker.json, migra automaticamente os palestrantes de exemplo
  const talkerJsonPath = path.resolve(__dirname, '../src/talker.json');
  if (fs.existsSync(talkerJsonPath)) {
    const rawData = fs.readFileSync(talkerJsonPath, 'utf-8');
    const talkers = JSON.parse(rawData);

    for (const t of talkers) {
      await prisma.talker.upsert({
        where: { id: t.id },
        update: {},
        create: {
          id: t.id,
          name: t.name,
          age: t.age,
          userId: admin.id,
          talk: t.talk ? {
            create: {
              watchedAt: t.talk.watchedAt,
              rate: t.talk.rate,
            },
          } : undefined,
        },
      });
    }
    console.log(`✅ ${talkers.length} palestrantes migrados com sucesso para o banco de dados.`);
  }

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
