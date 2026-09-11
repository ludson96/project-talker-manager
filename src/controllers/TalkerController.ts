import { Request, Response } from 'express';
import { TalkerService } from '../services/TalkerService';

export class TalkerController {
  private talkerService: TalkerService;

  constructor() {
    this.talkerService = new TalkerService();
  }

  getAll = async (_req: Request, res: Response) => {
    const talkers = await this.talkerService.getAll();
    return res.status(200).json(talkers);
  };

  getById = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const talker = await this.talkerService.getById(id);
    return res.status(200).json(talker);
  };

  search = async (req: Request, res: Response) => {
    const { q, rate } = req.query as { q?: string; rate?: string };
    const talkers = await this.talkerService.search(q, rate);
    return res.status(200).json(talkers);
  };

  create = async (req: Request, res: Response) => {
    const userId = req.user?.id;
    const newTalker = await this.talkerService.create(req.body, userId);
    return res.status(201).json(newTalker);
  };

  update = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const updatedTalker = await this.talkerService.update(id, req.body);
    return res.status(200).json(updatedTalker);
  };

  delete = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    await this.talkerService.delete(id);
    return res.status(204).send();
  };

  getMetrics = async (_req: Request, res: Response) => {
    const metrics = await this.talkerService.getMetrics();
    return res.status(200).json(metrics);
  };
}
