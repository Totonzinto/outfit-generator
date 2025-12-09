import Externalservices from "./externalservices.js";
import OutfitList from "./outfitList.js";
import Favorites from "./favorites.js";
import { qs } from "./utils.js";

// Get the current page path from the browser URL
const currentPath = window.location.pathname;

// Check if we are on the Favorites Page
if (currentPath.includes('favorites.html')) {
    console.log("Loading Favorites Page...");
    
    const favoritesElement = qs('#favorites-list');

    
    if (favoritesElement) {
       
        const favoritesApp = new Favorites(favoritesElement); 

        //  Render the saved outfits
        favoritesApp.renderFavorites();
        favoritesApp.renderComparison();
        
        //  Bind the event listeners (for the Remove buttons)
        favoritesApp.bindRemoveEvents();
    }

} else {
    // --- HOME PAGE (index.html) ---
    console.log("Loading Home Page (Index)...");

    const listElement = qs('.outfit-grid') || qs('#outfit-grid'); 

    //Only run if the element exists on the page
    if (listElement) {
        
        const dataSource = new Externalservices();
        const outfitList = new OutfitList(dataSource, listElement);
        
        //  Start fetching and rendering data
        outfitList.init();

        //  Handle Filter Buttons 
        document.querySelectorAll(".filters button").forEach(btn => {
            btn.addEventListener("click", (e) => {
                const category = e.target.dataset.filter;
               
                outfitList.filter(category); 
            });
        });

        //  Handle Search 
        qs("#search-input")?.addEventListener("keyup", (e) => {
            if(e.key === "Enter") {
                const query = e.target.value.toLowerCase();
                alert(`Searching Pinterest for: ${query}`);
            }
        });
    }
}

// --- MOBILE NAVIGATION TOGGLE ---

// Select the button and the navigation menu
const navToggle = qs('.mobile-nav-toggle');
const mainNav = qs('.main-nav');

if (navToggle && mainNav) {
    navToggle.addEventListener('click', () => {
        //  Toggle the 'is-open' class on the navigation menu
        mainNav.classList.toggle('is-open');

        // Toggle ARIA attributes for accessibility
        const isExpanded = navToggle.getAttribute('aria-expanded') === 'true' || false;
        navToggle.setAttribute('aria-expanded', !isExpanded);
        
    });
}
// --- Active Navigation Link---
function setActiveNav() {
    const navLinks = document.querySelectorAll('.main-nav a');
    const currentPath = window.location.pathname;

    navLinks.forEach(link => {
        // Check if the link's href is included in the current URL path
        if (currentPath.includes(link.getAttribute('href'))) {
            // Remove 'active' class from all other links
            navLinks.forEach(l => l.classList.remove('active')); 
            // Add 'active' class to the current link
            link.classList.add('active');
        }
    });
}

// Call the function once the document is ready
setActiveNav();