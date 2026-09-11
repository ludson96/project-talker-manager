import { TalkerRepository } from '../repositories/TalkerRepository';
import { CreateTalkerInput, UpdateTalkerInput } from '../schemas/talkerSchema';
import { AppError } from '../errors/AppError';

export class TalkerService {
  private talkerRepository: TalkerRepository;

  constructor() {
    this.talkerRepository = new TalkerRepository();
  }

  async getAll() {
    return this.talkerRepository.findAll();
  }

  async getById(id: number) {
    const talker = await this.talkerRepository.findById(id);
    if (!talker) {
      throw new AppError('Pessoa palestrante não encontrada', 404);
    }
    return talker;
  }

  async search(query?: string, rate?: string) {
    const parsedRate = rate ? Number(rate) : undefined;
    return this.talkerRepository.search(query, parsedRate);
  }

  async create(data: CreateTalkerInput, userId?: string) {
    return this.talkerRepository.create(data, userId);
  }

  async update(id: number, data: UpdateTalkerInput) {
    await this.getById(id); // Valida existência prévia
    return this.talkerRepository.update(id, data);
  }

  async delete(id: number) {
    await this.getById(id); // Valida existência prévia
    await this.talkerRepository.delete(id);
  }

  async getMetrics() {
    return this.talkerRepository.getMetrics();
  }
}
