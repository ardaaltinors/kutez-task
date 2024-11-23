import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Initialize Express
const app = express();

// Define port
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors()); // Enable CORS
app.use(express.json()); // Body parser

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to products.json
const productsFilePath = path.join(__dirname, 'data/products.json');

// Function to read products from JSON file
const getProducts = () => {
    const data = fs.readFileSync(productsFilePath, 'utf-8');
    return JSON.parse(data);
};

// Gold price in USD per gram (TODO: USE API)
const GOLD_PRICE = 60;

// Routes

app.get("/", (req, res) => {
    res.send("Welcome to Kutez Task API");
});

// Get all products
app.get("/api/products", (req, res) => {
    try {
        const products = getProducts();

        // Calculate price for each product
        const productsWithPrice = products.map(product => {
            const { popularityScore, weight } = product;
            const price = (popularityScore + 1) * weight * GOLD_PRICE;
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
            message: 'Failed to retrieve products.',
            error: error.message
        });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
