// Access the secured API key from the environment variables
const PINTEREST_API_KEY = process.env.PINTEREST_API_KEY; 


const PINTEREST_BASE_URL = 'https://api.pinterest.com/v5/search/pins'; 

async function searchPinterest(query) {
    if (!PINTEREST_API_KEY) {
        console.error("PINTEREST_API_KEY is missing from .env file!");
       
        return [
            { id: 9001, name: "Mock Summer Look", image: "https://via.placeholder.com/400?text=Mock+Pinterest+Data", category: "summer" },
        ];
    }

    try {
        const url = `${PINTEREST_BASE_URL}?query=${encodeURIComponent(query)}&ad_account_id=...`;
        
    
        const response = await fetch(url, {
            headers: {
                'Authorization': `Bearer ${PINTEREST_API_KEY}`, 
                'Accept': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`Pinterest API returned status ${response.status}`);
        }

        const data = await response.json();
        
      
        const outfits = data.items.map(pin => ({
            id: pin.id,
            name: pin.title || 'Outfit Inspiration',
            image: pin.media.images['236x']?.url || pin.media.images.original.url, // Choose the right image size
            category: query, 
            // Store the full pin data needed for the AI Breakdown step later
            fullPinData: pin
        }));
        
        return outfits;

    } catch (error) {
        console.error("Error fetching from Pinterest:", error);
        return [];
    }
}

module.exports = {
    searchPinterest
};