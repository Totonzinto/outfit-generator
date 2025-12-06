import { renderListWithTemplate, qs } from "./utils.js";

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
    }

    async init() {
        const list = await this.dataSource.getData();
        this.renderOutfits(list);
    }

    async filter(category) {
        const list = await this.dataSource.getData(category);
        this.renderOutfits(list);
    }

    renderOutfits(list) {
        renderListWithTemplate(outfitTemplate, this.element, list, "afterbegin", true);
        
        // Add event listeners to the new cards for the "AI Breakdown"
        document.querySelectorAll(".outfit-card").forEach(card => {
            card.addEventListener("click", (e) => {
                // Find the full object data
                const id = parseInt(e.currentTarget.dataset.id);
                const outfitData = list.find(item => item.id === id);
                this.showDetails(outfitData);
            });
        });
    }

    showDetails(outfit) {
        const modal = qs("#product-modal");
        const itemsContainer = qs("#modal-items");
        
        // This simulates the "Price Comparison Module" & "Product Detail Module"
        const html = outfit.items.map(item => 
            `<div class="product-item">
                <span>${item.name} (${item.retailer})</span>
                <span class="price">$${item.price}</span>
             </div>`
        ).join("");

        itemsContainer.innerHTML = html;
        modal.classList.remove("hidden");
        
        // Close Modal Logic
        qs(".close-btn").onclick = () => modal.classList.add("hidden");
    }
}