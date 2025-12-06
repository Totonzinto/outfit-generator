const { checkPriceFarfetch } = require('./api/farfetchservice');
const { searchPinterest } = require('./api/pinterestservice');
const express = require('express');
const path = require('path');
require('dotenv').config(); 

const app = express();
const PORT = 5000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json()); 


app.get('/api/search-outfits', async (req, res) => {
    
    const query = req.query.q || 'trending fashion'; 
    
    // Call the secure Pinterest service
    const results = await searchPinterest(query);
    
    res.json({ success: true, data: results });
});
    
    console.log(`Node Server received search query: ${req.query.q}`);
    
  
    res.json({ success: true, data: [
      
        { id: 101, name: "Server Styled Look", image: "https://images.unsplash.com/photo-1545959734-72b22d373bd6?w=400", category: "summer" },
    ]});

// 2. Breakdown/Price Check Endpoint (Farfetch)
app.get('/api/get-prices/:itemName', async (req, res) => {
    const itemName = req.params.itemName;
    console.log(`Node Server received price request for item: ${itemName}`);



    // Call the secure Farfetch service
    const breakdown = await checkPriceFarfetch(itemName);

    res.json({ success: true, breakdown: [
        { item: "Lace Cropped Top", price: 89.99, retailer: "Farfetch" },
        { item: "Wide-Leg Trousers", price: 155.00, retailer: "Gucci Outlet" },
    ]});
});


// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
    console.log(`API keys are secured in the environment.`);
});