import express from 'express';
import cors from 'cors';
import { config } from '../config/index.js';
import routes from '../routes/index.js';
import loggerMiddleware from '../middlewares/logger.js';

// Initialize Express
const app = express();

// Apply middlewares
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse incoming JSON requests
app.use(loggerMiddleware); // Logger for requests in development mode

// Bind routes
app.use('/', routes);

// Export the Express app as a serverless function
export default app;
