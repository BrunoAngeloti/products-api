"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const prisma_1 = require("../database/prisma");
const hash_1 = require("../utils/hash");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const register = async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
        return res.status(400).json({ error: "Campos obrigatórios" });
    const user = await prisma_1.prisma.user.create({
        data: {
            name,
            email,
            password: (0, hash_1.hashPassword)(password)
        }
    });
    res.json(user);
};
exports.register = register;
const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await prisma_1.prisma.user.findUnique({
        where: { email }
    });
    if (!user)
        return res.status(400).json({ error: "Usuário não encontrado" });
    if (user.password !== (0, hash_1.hashPassword)(password))
        return res.status(401).json({ error: "Senha inválida" });
    const token = jsonwebtoken_1.default.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.json({ token });
};
exports.login = login;
