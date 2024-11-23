import morgan from "morgan";
import { config } from "../config/index.js";

const loggerMiddleware = config.NODE_ENV === "development" ? morgan("dev") : (req, res, next) => next();

export default loggerMiddleware;