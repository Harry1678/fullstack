import { Router } from 'express';
import { AuthService } from '../auth/service';

export function createAuthRouter(auth: AuthService): Router {
  const r = Router();

  r.post('/register', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'email & password required' });
    const user = await auth.register(email, password);
    res.status(201).json({ id: user.id, email: user.email });
  });

  r.post('/login', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'email & password required' });
    try {
      const token = await auth.login(email, password);
      res.json({ token });
    } catch {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  });

  return r;
}
