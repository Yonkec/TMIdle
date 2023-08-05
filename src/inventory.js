import { DOMCacheGetOrSet } from "./DOMcache.js";

export class Inventory {
    constructor(player) {
        this.player = player;
        this.items = [];
    }

    addItem(item) {
        this.items.push(item);
    }

    populateGrid() {
        const inventoryGrid = DOMCacheGetOrSet('inventoryGrid');

        //clear the grid each time this is called to avoid duplicates
        inventoryGrid.innerHTML = '';
    
        this.items.forEach(item => {
            const card = document.createElement('div');
            card.classList.add('inventory-item-card');
    
            const nameElement = document.createElement('h4');
            nameElement.textContent = item.name;
            card.appendChild(nameElement);
    
            if (item.image) {
                const imgElement = document.createElement('img');
                imgElement.src = item.image;
                imgElement.classList.add('inventory-item-image');
                card.appendChild(imgElement);
            }
    
            const descriptionElement = document.createElement('p');
            descriptionElement.textContent = item.description;
            card.appendChild(descriptionElement);
    
            const statsElement = document.createElement('p');
            const statsStrings = Object.entries(item.stats).map(([stat, value]) => `${stat}: ${value}`);
            statsElement.textContent = statsStrings.join(', ');
            card.appendChild(statsElement);

            card.addEventListener('click', () => {
                const previouslySelectedItem = document.querySelector('.inventory-item-card-selected');
                if (previouslySelectedItem) {
                    previouslySelectedItem.classList.remove('inventory-item-card-selected');
                }
                card.classList.add('inventory-item-card-selected');
            });

            inventoryGrid.appendChild(card);
        });
    }
}
