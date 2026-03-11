import { Router } from "express";
import { createProduct, getProducts, updateProduct, deleteProduct, getProductById } from "../controllers/productsController";
import { authMiddleware } from "../middleware/auth";
import { upload } from "../utils/upload";

const router = Router();

router.get("/", getProducts);
router.get("/:id", getProductById);
router.post("/", authMiddleware, upload.single("foto"), createProduct);
router.put("/:id", authMiddleware, updateProduct);
router.delete("/:id", authMiddleware, deleteProduct);

export default router;