const API_BASE = '/api'; 

export default class externalservices {
    
    // Used by OutfitList.js to get the initial list of outfits 
    async getData(query = "trending fashion") {
        const url = `${API_BASE}/search-outfits?q=${query}`;
        
        try {
            const response = await fetch(url);
            if (!response.ok) {
                // Handle server errors gracefully
                throw new Error(`Server error! Status: ${response.status}`);
            }
            const data = await response.json();
            
            // The server returns an object { success: true, data: [...] }
            return data.data || []; 
            
        } catch (error) {
            console.error("Error fetching outfits from server:", error);
          
            return [];
        }
    }
    
   
    async getOutfitBreakdown(outfitId, keyItemName) {
         // The server endpoint takes the item name as a parameter
         const url = `${API_BASE}/get-prices/${encodeURIComponent(keyItemName)}`;

         try {
             const response = await fetch(url);
             if (!response.ok) {
                throw new Error(`Server error! Status: ${response.status}`);
            }
             const data = await response.json();
             
             // The server returns an object { success: true, breakdown: [...] }
             return data.breakdown || [];
             
         } catch (error) {
             console.error("Error fetching price breakdown from server:", error);
             return [];
         }
    }
    
    
    getLocalStorage(key) {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : [];
        } catch (e) {
            console.error("Error reading from local storage:", e);
            return [];
        }
    }

    setLocalStorage(key, data) {
        try {
            localStorage.setItem(key, JSON.stringify(data));
        } catch (e) {
            console.error("Error writing to local storage:", e);
        }
    }
}