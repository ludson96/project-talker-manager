import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UserRepository } from '../repositories/UserRepository';
import { LoginInput, RegisterInput } from '../schemas/authSchema';
import { AppError } from '../errors/AppError';
import { env } from '../config/env';

export class AuthService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async register(data: RegisterInput) {
    const userExists = await this.userRepository.findByEmail(data.email);
    if (userExists) {
      throw new AppError('Email já cadastrado no sistema', 409);
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = await this.userRepository.create({
      ...data,
      password: hashedPassword,
    });

    const token = this.generateToken(user.id, user.email);

    return { user, token };
  }

  async login(data: LoginInput) {
    const user = await this.userRepository.findByEmail(data.email);
    if (!user) {
      throw new AppError('Credenciais inválidas', 401);
    }

    const passwordMatches = await bcrypt.compare(data.password, user.password);
    if (!passwordMatches) {
      throw new AppError('Credenciais inválidas', 401);
    }

    const token = this.generateToken(user.id, user.email);

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      token,
    };
  }

  private generateToken(id: string, email: string): string {
    return jwt.sign({ id, email }, env.JWT_SECRET, {
      expiresIn: '7d',
    });
  }
}
