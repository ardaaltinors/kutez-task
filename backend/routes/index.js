import { Router } from "express";
import productsRouter from "./products.js";

const router = Router();

router.get("/", (req, res) => {
    res.send("Welcome to Kutez Task API");
});

// Products route
router.use("/api/products", productsRouter);

export default router;
