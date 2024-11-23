import axios from "axios";
import { config } from "../config/index.js";

const METAL_PRICE_API_URL = "https://api.metalpriceapi.com/v1/latest";

export const getGoldPrice = async () => {
    try {
        // Log the API key (for debugging purposes only)
        console.log("Using Metal Price API Key:", config.METAL_PRICE_API_KEY);

        const response = await axios.get(METAL_PRICE_API_URL, {
            params: {
                api_key: config.METAL_PRICE_API_KEY,
                base: "USD",
                currencies: "XAU",
            }
        });

        console.log("api response:", response.data);

        if (response.data && response.data.success) {
            return response.data.rates.XAU;
        } else {
            throw new Error("Failed to fetch gold price from API.");
        }
    } catch (error) {
        console.error("💥Error fetching gold price:", error.response ? error.response.data : error.message);
        throw new Error("Unable to retrieve gold price");
    }
};
