import { renderListWithTemplate, qs } from './utils.js';
import Favorites from './favorites.js'; 
import ExternalServices from './externalservices.js'; 


// Template function (helper function, stays outside the class)
function outfitTemplate(outfit) {
    return `<div class="outfit-card" data-id="${outfit.id}">
        <img src="${outfit.image}" alt="${outfit.name}"> 
        <div class="outfit-info">${outfit.name}</div>
    </div>`;
}

export default class OutfitList { 
    constructor(dataSource, element) { 
        this.dataSource = dataSource; 
        this.element = element;
       
        this.favoritesApp = new Favorites(qs('#favorites-list')); 
        
    }

    // This method is required by main.js to start loading data
    async init() {
        const outfitData = await this.dataSource.getData();
        this.list = outfitData;
        this.renderList(outfitData);
        this.bindEvents();
        this.bindSearchEvents();
        this.bindFilterEvents();
    }

    
    renderList(list) {
        this.element.innerHTML = ""; 
        renderListWithTemplate(outfitTemplate, this.element, list);
    }
    
    // Binds click handlers to the outfit cards
    bindEvents() {
        this.element.addEventListener('click', (e) => {
            if (e.target.closest('.outfit-card')) {
                const id = parseInt(e.target.closest('.outfit-card').dataset.id); 
               
                const clickedOutfit = this.list.find(outfit => outfit.id === id); 

                if (clickedOutfit) {
                    this.showDetails(clickedOutfit); 
                } else {
                    console.error(`Outfit with ID ${id} not found.`);
                }
            }
        });
    }

    showDetails(outfit) {
        const modal = qs("#product-modal");
        const itemsContainer = qs("#modal-items");
        
       
        const outfitNameHtml = `<h2>${outfit.name} - Breakdown</h2>`; 
        
        let breakdownData = [];
        
        if (outfit.category.includes("summer")) {
            breakdownData = [
                { name: "Linen Dress", price: 120.00, retailer: "Farfetch" },
                
            ];
        } else {
            // Default/Fallback breakdown for other categories
            breakdownData = [
                { name: "Denim Jacket", price: 99.99, retailer: "ASOS" },
                { name: "Sneakers", price: 150.00, retailer: "Nike" },
            ];
        }
        
      
        const html = breakdownData.map(item => 
            `<div class="product-item">
                <span>${item.name} (${item.retailer})</span>
                <span class="price">$${item.price}</span>
             </div>`
        ).join("");

        itemsContainer.innerHTML = `
            ${outfitNameHtml}  ${html}
            <button id="save-outfit-btn" data-id="${outfit.id}" class="save-btn">
                ${this.favoritesApp.isFavorite(outfit.id) ? 'Saved (Remove)' : 'Save to Favorites'}
            </button>
        `;
        modal.classList.remove("hidden");
        
        // --- Event Listener for Save/Remove ---
        qs("#save-outfit-btn").onclick = (e) => {
            const outfitId = parseInt(e.target.dataset.id);
           
            if (this.favoritesApp.isFavorite(outfitId)) { 
                this.favoritesApp.removeOutfit(outfitId);
                e.target.textContent = 'Save to Favorites';
            } else {
                this.favoritesApp.addOutfit(outfit); 
                e.target.textContent = 'Saved (Remove)';
            }
        };

    // Close Modal Logic
    qs(".close-btn").onclick = () => modal.classList.add("hidden");
}

bindSearchEvents() {
        const searchInput = qs('#search-input');
        const searchButton = qs('#search-button'); 

        // Function to handle the actual filtering/searching
        const handleSearch = (e) => {
            // Prevent the default browser action (like a page reload or generic alert)
            e.preventDefault(); 
            
            const searchTerm = searchInput.value.toLowerCase();
            
            if (searchTerm === "") {
              
                this.renderList(this.list);
            } else {
                
                const filteredList = this.list.filter(outfit => 
                    outfit.name.toLowerCase().includes(searchTerm)
                );
                this.renderList(filteredList);
            }
        };
       
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                handleSearch(e);
            }
        });

               
                if (searchButton) {
                    searchButton.addEventListener('click', handleSearch);
                }
        }

    bindFilterEvents() {
        const filterContainer = qs('.filters'); 

        filterContainer.addEventListener('click', (e) => {
            if (e.target.tagName === 'BUTTON') {
                e.preventDefault(); 

                const category = e.target.textContent.toLowerCase().trim();
                
                
                filterContainer.querySelectorAll('button').forEach(btn => btn.classList.remove('active'));
                
                // Add 'active' to the clicked button
                e.target.classList.add('active');

                // --- Filtering Logic ---
                if (category === "all" || category === "all styles") {
                    // Show all outfits if an 'All' button is clicked
                    this.renderList(this.list);
                } else {
                    // Filter based on the button text matching the outfit category
                    const filteredList = this.list.filter(outfit => 
                        outfit.category.toLowerCase() === category
                    );
                    this.renderList(filteredList);
                }
            }
        });
    }
}   
