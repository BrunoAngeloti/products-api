"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.getProductById = exports.getProducts = exports.createProduct = void 0;
const prisma_1 = require("../database/prisma");
const createProduct = async (req, res) => {
    const { codigo_produto, descricao_produto } = req.body;
    if (!codigo_produto || !descricao_produto)
        return res.status(400).json({ error: "Campos obrigatórios" });
    const foto = req.file?.filename;
    const product = await prisma_1.prisma.product.create({
        data: {
            codigo_produto,
            descricao_produto,
            foto_produto: foto
        }
    });
    res.json(product);
};
exports.createProduct = createProduct;
const getProducts = async (req, res) => {
    const products = await prisma_1.prisma.product.findMany({
        orderBy: [
            { status: "desc" },
            { descricao_produto: "asc" }
        ]
    });
    res.json(products);
};
exports.getProducts = getProducts;
const getProductById = async (req, res) => {
    const { id } = req.params;
    if (!id || Array.isArray(id)) {
        return res.status(400).json({ error: "ID inválido" });
    }
    const product = await prisma_1.prisma.product.findUnique({
        where: { id },
    });
    if (!product) {
        return res.status(404).json({ error: "Produto não encontrado" });
    }
    return res.json(product);
};
exports.getProductById = getProductById;
const updateProduct = async (req, res) => {
    const { id } = req.params;
    if (!id || Array.isArray(id)) {
        return res.status(400).json({ error: "ID inválido" });
    }
    const product = await prisma_1.prisma.product.update({
        where: { id },
        data: req.body
    });
    res.json(product);
};
exports.updateProduct = updateProduct;
const deleteProduct = async (req, res) => {
    const { id } = req.params;
    if (!id || Array.isArray(id)) {
        return res.status(400).json({ error: "ID inválido" });
    }
    await prisma_1.prisma.product.delete({
        where: { id }
    });
    res.json({ message: "Produto removido" });
};
exports.deleteProduct = deleteProduct;
