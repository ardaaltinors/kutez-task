import axios from "axios";
import NodeCache from "node-cache";
import { config } from "../config/index.js";

// Initialize node-cache
const GOLD_PRICE_CACHE_TTL = 60 * 4 * 60; // 4 hours
const cache = new NodeCache({ stdTTL: GOLD_PRICE_CACHE_TTL, checkperiod: 120 });

const METAL_PRICE_API_URL = "https://www.goldapi.io/api/XAU/USD";

// Fetches the current gold price in USD
export const getGoldPrice = async () => {
    try {
        // Check if the gold price is present in the cache
        const cachedGoldPrice = cache.get("goldPrice");
        if (cachedGoldPrice) {
            console.log("returning cached gold price:", cachedGoldPrice);
            return cachedGoldPrice;
        }

        // If not in cache, fetch from the Metal Price API
        console.log("cache NOT hit, fetchıng from the api...");

        const response = await axios.get(METAL_PRICE_API_URL, {
            headers: {
                "x-access-token": config.METAL_PRICE_API_KEY,
                "Content-Type": "application/json"
            }
        });

        console.log("api response:", response.data);

        if (response.data && response.data.price) {
            const goldPrice = response.data.price_gram_24k;

            // Store the fetched gold price in the cache
            cache.set("goldPrice", goldPrice);
            console.log("gold price cached:", goldPrice);

            return goldPrice;
        } else {
            throw new Error("Failed to fetch gold price from API.");
        }
    } catch (error) {
        console.error("💥 Error fetching gold price:", error.response ? error.response.data : error.message);
        throw new Error("Unable to retrieve gold price");
    }
};
