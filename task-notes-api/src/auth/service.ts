import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserDatabase } from '../database';
import { User } from '../models/user';

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret';

export interface JWTPayload {
  id: number;
  role: string;
}

export class AuthService {
  constructor(private userDb: UserDatabase) {}

  async register(email: string, password: string): Promise<User> {
    const hash = await bcrypt.hash(password, 10);
    return this.userDb.createUser(email, hash, 'user');
  }

  async login(email: string, password: string): Promise<string> {
    const user = this.userDb.getUserByEmail(email);
    if (!user) throw new Error('Invalid credentials');

    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok) throw new Error('Invalid credentials');

    return jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
  }

  verifyToken(token: string): JWTPayload {
    return jwt.verify(token, JWT_SECRET) as JWTPayload;
  }
}
