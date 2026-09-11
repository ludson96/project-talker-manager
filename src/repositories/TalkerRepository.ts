import { prisma } from '../database/prisma';
import { CreateTalkerInput, UpdateTalkerInput } from '../schemas/talkerSchema';

export class TalkerRepository {
  async findAll() {
    const talkers = await prisma.talker.findMany({
      include: {
        talk: true,
      },
      orderBy: { id: 'asc' },
    });

    return talkers.map(this.formatTalker);
  }

  async findById(id: number) {
    const talker = await prisma.talker.findUnique({
      where: { id },
      include: {
        talk: true,
      },
    });

    if (!talker) return null;
    return this.formatTalker(talker);
  }

  async search(query?: string, rate?: number) {
    const talkers = await prisma.talker.findMany({
      where: {
        name: query ? { contains: query, mode: 'insensitive' } : undefined,
        talk: rate ? { rate } : undefined,
      },
      include: {
        talk: true,
      },
      orderBy: { id: 'asc' },
    });

    return talkers.map(this.formatTalker);
  }

  async create(data: CreateTalkerInput, userId?: string) {
    const talker = await prisma.talker.create({
      data: {
        name: data.name,
        age: data.age,
        userId: userId && userId !== 'legacy-user' ? userId : null,
        talk: {
          create: {
            watchedAt: data.talk.watchedAt,
            rate: data.talk.rate,
          },
        },
      },
      include: {
        talk: true,
      },
    });

    return this.formatTalker(talker);
  }

  async update(id: number, data: UpdateTalkerInput) {
    const talker = await prisma.talker.update({
      where: { id },
      data: {
        name: data.name,
        age: data.age,
        talk: {
          upsert: {
            create: {
              watchedAt: data.talk.watchedAt,
              rate: data.talk.rate,
            },
            update: {
              watchedAt: data.talk.watchedAt,
              rate: data.talk.rate,
            },
          },
        },
      },
      include: {
        talk: true,
      },
    });

    return this.formatTalker(talker);
  }

  async delete(id: number) {
    return prisma.talker.delete({
      where: { id },
    });
  }

  async getMetrics() {
    const total = await prisma.talker.count();
    const talks = await prisma.talk.findMany({
      select: { rate: true },
    });

    const averageRate =
      talks.length > 0
        ? Number((talks.reduce((acc, curr) => acc + curr.rate, 0) / talks.length).toFixed(2))
        : 0;

    return {
      totalTalkers: total,
      totalTalks: talks.length,
      averageRate,
    };
  }

  private formatTalker(t: any) {
    return {
      id: t.id,
      name: t.name,
      age: t.age,
      talk: t.talk ? {
        watchedAt: t.talk.watchedAt,
        rate: t.talk.rate,
      } : null,
    };
  }
}
