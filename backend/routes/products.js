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

// parse query parameters
const parseQueryParams = (query) => {
    const filters = {};

    // Price Range
    if (query.minPrice) {
        const minPrice = parseFloat(query.minPrice);
        if (!isNaN(minPrice)) {
            filters.minPrice = minPrice;
        }
    }
    if (query.maxPrice) {
        const maxPrice = parseFloat(query.maxPrice);
        if (!isNaN(maxPrice)) {
            filters.maxPrice = maxPrice;
        }
    }

    // Popularity Score Range
    if (query.minPopularity) {
        const minPopularity = parseInt(query.minPopularity, 10);
        if (!isNaN(minPopularity)) {
            filters.minPopularity = minPopularity;
        }
    }
    if (query.maxPopularity) {
        const maxPopularity = parseInt(query.maxPopularity, 10);
        if (!isNaN(maxPopularity)) {
            filters.maxPopularity = maxPopularity;
        }
    }

    return filters;
};

// Get all products with dynamic pricing and optional filtering
router.get("/", async (req, res) => {
    try {
        const products = getProducts();

        // Fetch gold price from API
        const goldPrice = await getGoldPrice();

        // Calculate price for each product
        const productsWithPrice = products.map(product => {
            const { popularityScore, weight } = product;
            const price = (popularityScore + 1) * weight * goldPrice;
            return {
                ...product,
                price: parseFloat(price.toFixed(2))
            };
        });

        // Parse and extract filter criteria from query parameters
        const filters = parseQueryParams(req.query);

        // Apply filtering based on provided criteria
        let filteredProducts = productsWithPrice;

        if (filters.minPrice !== undefined) {
            filteredProducts = filteredProducts.filter(product => product.price >= filters.minPrice);
        }

        if (filters.maxPrice !== undefined) {
            filteredProducts = filteredProducts.filter(product => product.price <= filters.maxPrice);
        }

        if (filters.minPopularity !== undefined) {
            filteredProducts = filteredProducts.filter(product => product.popularityScore >= filters.minPopularity);
        }

        if (filters.maxPopularity !== undefined) {
            filteredProducts = filteredProducts.filter(product => product.popularityScore <= filters.maxPopularity);
        }

        res.json({
            success: true,
            data: filteredProducts
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
