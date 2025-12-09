// This array acts as the "Database" of Pinterest images
const localOutfits = [
    {
        id: 1,
        name: "Casual Summer Look",
        category: "summer",
        image: "/images/summer1.jpg",
        originalLink: "https://pinterest.com/pin/...",
        
    },
    {
        id: 2,
        name: "Casual Summer Look",
        category: "summer",
        image: "/images/summer2.jpg",
        originalLink: "https://pinterest.com/pin/...",
    
    },
    {
        id: 3,
        name: "Casual Summer Look",
        category: "summer",
        image: "/images/summer3.jpg", 
        originalLink: "https://pinterest.com/pin/...",
    
    },
     {
        id: 4,
        name: "Cozy Winter Vibe",
        category: "winter",
        image: "/images/winter1.jpg",
        originalLink: "https://pinterest.com/pin/...",
        
    },
     {
        id: 5,
        name: "Cozy Winter Vibe",
        category: "winter",
        image: "/images/winter2.jpg", 
        originalLink: "https://pinterest.com/pin/...",
        
    },
     {
        id: 6,
        name: "Cozy Winter Vibe",
        category: "winter",
        image: "/images/winter3.jpg", 
        originalLink: "https://pinterest.com/pin/...",
         
    },
     {
        id: 7,
        name: "smart vintage look",
        category: "vintage",
        image: "/images/vintage1.jpg", 
        originalLink: "https://pinterest.com/pin/...",
        
    },
     {
        id: 8,
        name: "smart vintage look",
        category: "vintage",
        image: "/images/vintage2.jpg", 
        originalLink: "https://pinterest.com/pin/...",
       
    },
     {
        id: 9,
        name: "smart vintage look",
        category: "vintage",
        image: "/images/vintage3.jpg", 
        originalLink: "https://pinterest.com/pin/...",
         
    },
     {
        id: 10,
        name: "urban streetwear",
        category: "streetwear",
        image: "/images/streetwear1.jpg", 
        originalLink: "https://pinterest.com/pin/...",
       
    },
     {
        id: 11,
        name: "urban streetwear",
        category: "streetwear",
        image: "/images/sreetwear2.jpg",
        originalLink: "https://pinterest.com/pin/...",
       
    },
    
    {
        id: 12,
        name: "urban streetwear",
        category: "streetwear",
        image: "/images/streetwear3.jpg",
        originalLink: "https://pinterest.com/pin/...",
        
    },
];

async function searchPinterest(query) {
    // Simulate a network delay (makes it feel like a real API)
    return new Promise((resolve) => {
        setTimeout(() => {
            if (!query || query === 'trending fashion') {
                // If no specific search, return everything
                resolve(localOutfits);
            } else {
                // Filter the local array based on the search keyword
                const filtered = localOutfits.filter(item => 
                    item.category.includes(query.toLowerCase()) || 
                    item.name.toLowerCase().includes(query.toLowerCase())
                );
                resolve(filtered);
            }
        }, 300); 
    });
}

module.exports = {
    searchPinterest
};