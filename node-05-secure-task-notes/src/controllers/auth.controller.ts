import { Request, Response } from "express";
import { createUser, getUserByEmail } from "../db/users.repo";
import { hashPassword, comparePassword } from "../auth/password";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "dev_secret";

export async function register(req: Request, res: Response) {
  const { email, password } = req.body;

  const existing = await getUserByEmail(email);
  if (existing) {
    return res.status(400).json({ message: "Email already exists" });
  }

  const passwordHash = await hashPassword(password);
  const id = await createUser(email, passwordHash, "user");

  res.status(201).json({ id, email });
}

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;

  const user = await getUserByEmail(email);
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const ok = await comparePassword(password, user.password_hash);
  if (!ok) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign(
  {
    id: user.id,     
    role: user.role,
  },
  JWT_SECRET,
  { expiresIn: "1h" }
);

res.json({ token });
}
