// Access the secured API key from the environment variables
const FARFETCH_API_KEY = process.env.FARFETCH_API_KEY; 

const FARFETCH_BASE_URL = 'https://api.farfetch.com/v1/search'; 

/**
 * Searches Farfetch for a product or a similar item and retrieves price/seller info.
 * @param {string} itemName 
 * @returns {Array} An array of product objects with price, seller, and link.
 */
async function checkPriceFarfetch(itemName) {
    if (!FARFETCH_API_KEY) {
        console.error("FARFETCH_API_KEY is missing from .env file!");
    
        return [
            { name: itemName, price: 99.00, retailer: "Mock Retailer", link: "#" },
        ];
    }

    try {
        const url = `${FARFETCH_BASE_URL}?q=${encodeURIComponent(itemName)}&currency=USD`;
        
     
        const response = await fetch(url, {
            headers: {
                'X-Api-Key': FARFETCH_API_KEY,
                'Accept': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`Farfetch API returned status ${response.status}`);
        }

        const data = await response.json();
        
        
        const products = data.products.slice(0, 3).map(product => ({
            name: product.name,
            price: product.pricing.currentPrice,
            retailer: product.brand.name || 'Farfetch',
            link: product.url,
           
        }));
        
        return products;

    } catch (error) {
        console.error(`Error fetching price for ${itemName}:`, error);
        return [];
    }
}

module.exports = {
    checkPriceFarfetch
};