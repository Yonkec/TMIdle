import { DOMCacheGetOrSet } from "./DOMcache.js";

export class Shop {
    constructor() {

        this.items = [];

        fetch('database/items.json')
        .then(response => response.json())
        .then(data => {
            this.items = data;
            this.populateGrid();
        })
        .catch(error => console.error('Error:', error));
    }

    // A method for purchasing items
    buyItem(player, itemId) {
        let item = this.items.find(item => item.id == itemId);

        if (!item) {
        return 'Item does not exist.';
        }
        
        if (player.malk >= item.price) {
            player.removeMalk(item.price);
            player.addInventory(item);
            return `You have bought ${item.name}!`;
        } else {
            return 'You do not have enough malk.';
        }
    }

    populateGrid() {
        const itemsGrid = DOMCacheGetOrSet('itemsGrid');
    
        this.items.forEach(item => {
            const card = document.createElement('div');
            card.classList.add('shop-item-card');
    
            const nameElement = document.createElement('h4');
            nameElement.textContent = item.name;
            card.appendChild(nameElement);
    
            // Add an image if available
            if (item.image) {
                const imgElement = document.createElement('img');
                imgElement.src = item.image;
                imgElement.classList.add('shop-item-image')
                card.appendChild(imgElement);
            }
    
            const costElement = document.createElement('p');
            costElement.textContent = 'Cost: ' + item.cost;
            card.appendChild(costElement);
    
            const descriptionElement = document.createElement('p');
            descriptionElement.textContent = item.description;
            card.appendChild(descriptionElement);
    
            const statsElement = document.createElement('p');
            const statsStrings = Object.entries(item.stats).map(([stat, value]) => `${stat}: ${value}`);
            statsElement.textContent = statsStrings.join(', ');
            card.appendChild(statsElement);
    
            itemsGrid.appendChild(card);
        });

    // populateTable() {
    //     const tableBody = DOMCacheGetOrSet('itemsBody');
    
    //     this.items.forEach(item => {
    //         const row = document.createElement('tr');
        
    //         const nameCell = document.createElement('td');
    //         nameCell.textContent = item.name;
    //         row.appendChild(nameCell);
        
    //         const costCell = document.createElement('td');
    //         costCell.textContent = item.cost;
    //         row.appendChild(costCell);
        
    //         const descriptionCell = document.createElement('td');
    //         descriptionCell.textContent = item.description;
    //         row.appendChild(descriptionCell);
        
    //         const statsCell = document.createElement('td');
    //         const statsStrings = Object.entries(item.stats).map(([stat, value]) => `${stat}: ${value}`);
    //         statsCell.textContent = statsStrings.join(', ');
    //         row.appendChild(statsCell);
        
    //         tableBody.appendChild(row);
    //     });
    }

    addItemToShop(item) {
        this.items.push(item);
    }
}
