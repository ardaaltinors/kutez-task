import express from "express";
import cors from "cors";

// Initialize Express
const app = express();

// Define port
const PORT = process.env.PORT || 3000;

app.use(cors());

// Middlewares
app.use(cors()); // Enable CORS
app.use(express.json()); // Body parser

if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

// Routes
app.get("/", (req, res) => {
    res.send("Welcome to Kutez Task API");
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
