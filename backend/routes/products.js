import { Router } from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { getGoldPrice } from "../services/metalPriceService.js";

const router = Router();

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to products.json
const productsFilePath = path.join(__dirname, "../data/products.json");

// Function to read products from JSON file
const getProducts = () => {
    const data = fs.readFileSync(productsFilePath, "utf-8");
    return JSON.parse(data);
};

// Get all products with dynamic pricing
router.get("/", async (req, res) => {
    try {
        const products = getProducts();

        // Fetch gold price from api
        const goldPrice = await getGoldPrice();

        // Calculate price for each product
        const productsWithPrice = products.map(product => {
            const { popularityScore, weight } = product;
            const price = (popularityScore + 1) * weight * goldPrice;
            return {
                ...product,
                price: price.toFixed(2)
            };
        });

        res.json({
            success: true,
            data: productsWithPrice
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to retrieve products.",
            error: error.message
        });
    }
});

export default router;
