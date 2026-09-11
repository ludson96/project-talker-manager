import { Request, Response } from 'express';
import { AuthService } from '../services/AuthService';

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  register = async (req: Request, res: Response) => {
    const result = await this.authService.register(req.body);
    return res.status(201).json(result);
  };

  login = async (req: Request, res: Response) => {
    // Compatibilidade com o projeto original: se o login for do formato simplificado ou completo
    const result = await this.authService.login(req.body);
    return res.status(200).json(result);
  };

  // Endpoint legado caso queira retornar somente token de 16 caracteres em /login original
  legacyLogin = async (req: Request, res: Response) => {
    const token = Math.random().toString(36).substring(2, 10) + Math.random().toString(36).substring(2, 10);
    return res.status(200).json({ token });
  };
}
