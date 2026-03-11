import { Request, Response } from "express";
import { prisma } from "../database/prisma";

export const createProduct = async (req: Request, res: Response) => {
  const { codigo_produto, descricao_produto } = req.body;

  if (!codigo_produto || !descricao_produto)
    return res.status(400).json({ error: "Campos obrigatórios" });

  const foto = req.file?.filename;

  const product = await prisma.product.create({
    data: {
      codigo_produto,
      descricao_produto,
      foto_produto: foto
    }
  });

  res.json(product);
};

export const getProducts = async (req: Request, res: Response) => {
  const products = await prisma.product.findMany();
  res.json(products);
};

export const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id || Array.isArray(id)) {
    return res.status(400).json({ error: "ID inválido" });
  }

  const product = await prisma.product.update({
    where: { id },
    data: req.body
  });

  res.json(product);
};

export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id || Array.isArray(id)) {
    return res.status(400).json({ error: "ID inválido" });
  }

  await prisma.product.delete({
    where: { id }
  });

  res.json({ message: "Produto removido" });
};