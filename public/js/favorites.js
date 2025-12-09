import ExternalServices from './externalservices.js';
import { qs } from './utils.js'; 

const FAV_KEY = 'savedOutfits';
const services = new ExternalServices();

export default class Favorites {
    constructor(element) {
        this.listElement = element;
        this.outfits = services.getLocalStorage(FAV_KEY);
    }

    // Adds a new outfit to local storage
    addOutfit(outfitData) {
        const existingIndex = this.outfits.findIndex(o => o.id === outfitData.id);
        
        if (existingIndex === -1) {
            this.outfits.push(outfitData);
            services.setLocalStorage(FAV_KEY, this.outfits);
            console.log(`Outfit ${outfitData.id} added to favorites.`);
            return true; 
        }
        return false; 
    }

    // Removes an outfit from local storage
    removeOutfit(outfitId) {
        this.outfits = this.outfits.filter(o => o.id !== outfitId);
        services.setLocalStorage(FAV_KEY, this.outfits);
        console.log(`Outfit ${outfitId} removed from favorites.`);
    }

    // Checks if an outfit is already saved
    isFavorite(outfitId) {
        return this.outfits.some(o => o.id === outfitId);
    }
    
    

    // Renders the list of favorite outfits, used on a separate "Favorites" view
    renderFavorites() {
        if (!this.listElement) return;

        if (this.outfits.length === 0) {
            this.listElement.innerHTML = '<p class="empty-message">You have no saved outfits yet.</p>';
            return;
        }

        const htmlList = this.outfits.map(outfit => this.template(outfit));
        this.listElement.innerHTML = htmlList.join('');
    }

    renderComparison() {
        const comparisonElement = qs('#comparison-table');
        if (!comparisonElement) return;

       
        // This is a mock comparison.
        const mockComparisonItems = [
            { item: 'Linen Dress', retailerA: { name: 'Farfetch', price: 150.00 }, retailerB: { name: 'ASOS', price: 125.00 } },
            { item: 'Winter Jacket', retailerA: { name: 'Zalando', price: 79.99 }, retailerB: { name: 'Farfetch', price: 110.50 } },
        ];
        
        // --- HTML Table Generation ---
        let html = `
            <table>
                <thead>
                    <tr>
                        <th>Item</th>
                        <th>Retailer A</th>
                        <th>Retailer B</th>
                    </tr>
                </thead>
                <tbody>`;

        mockComparisonItems.forEach(data => {
            html += `
                <tr>
                    <td>${data.item}</td>
                    <td class="price-cell">
                        <span class="retailer-name">${data.retailerA.name}</span>
                        <span class="price">$${data.retailerA.price.toFixed(2)}</span>
                    </td>
                    <td class="price-cell">
                        <span class="retailer-name">${data.retailerB.name}</span>
                        <span class="price">$${data.retailerB.price.toFixed(2)}</span>
                    </td>
                </tr>`;
        });

        html += `</tbody></table>`;
        
        comparisonElement.innerHTML = html;
    }

    // Template for a saved outfit card
    template(outfit) {
        return `<div class="favorite-card" data-id="${outfit.id}">
            <img src="${outfit.image}" alt="${outfit.name}">
            <h3>${outfit.name}</h3>
            <button class="remove-btn" data-id="${outfit.id}">Remove</button>
        </div>`;
    }

    // Sets up event listeners for the remove buttons
    bindRemoveEvents() {
        this.listElement.addEventListener('click', (e) => {
            if (e.target.classList.contains('remove-btn')) {
                const outfitId = parseInt(e.target.dataset.id);
                this.removeOutfit(outfitId);
                // Re-render the list immediately after removal
                this.renderFavorites(); 
            }
        });
    }
}