import { Request, Response } from "express";
import { prisma } from "../database/prisma";
import { hashPassword } from "../utils/hash";
import jwt from "jsonwebtoken";

export const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password)
    return res.status(400).json({ error: "Campos obrigatórios" });

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashPassword(password)
    }
  });

  res.json(user);
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({
    where: { email }
  });

  if (!user)
    return res.status(400).json({ error: "Usuário não encontrado" });

  if (user.password !== hashPassword(password))
    return res.status(401).json({ error: "Senha inválida" });

  const token = jwt.sign(
    { id: user.id },
    process.env.JWT_SECRET!,
    { expiresIn: "1d" }
  );

  res.json({ token });
};