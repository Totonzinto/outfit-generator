import ExternalServices from "./externalservices.js";
import OutfitList from "./outfitList.js";
import { qs } from "./utils.js";

const dataSource = new ExternalServices();
const listElement = qs("#outfit-grid");
const outfitList = new OutfitList(dataSource, listElement);

// 1. Initialize the app
outfitList.init();

// 2. Handle Filter Buttons
document.querySelectorAll(".filters button").forEach(btn => {
    btn.addEventListener("click", (e) => {
        const category = e.target.dataset.filter;
        outfitList.filter(category);
    });
});

// 3. Handle Search (Basic implementation)
qs("#search-input").addEventListener("keyup", (e) => {
    if(e.key === "Enter") {
        const query = e.target.value.toLowerCase();
        // In a real app, you would pass this to the API search method
        alert(`Searching Pinterest for: ${query}`);
    }
});