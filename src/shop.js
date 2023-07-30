import { DOMCacheGetOrSet } from "./DOMcache.js";

export class Shop {
    constructor() {

        this.items = [];

        fetch('database/items.json')
        .then(response => response.json())
        .then(data => {
            this.items = data;
            this.populateTable();
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

    populateTable() {
        const tableBody = DOMCacheGetOrSet('itemsBody');
    
        this.items.forEach(item => {
            const row = document.createElement('tr');
        
            const nameCell = document.createElement('td');
            nameCell.textContent = item.name;
            row.appendChild(nameCell);
        
            const costCell = document.createElement('td');
            costCell.textContent = item.cost;
            row.appendChild(costCell);
        
            const descriptionCell = document.createElement('td');
            descriptionCell.textContent = item.description;
            row.appendChild(descriptionCell);
        
            const statsCell = document.createElement('td');
            const statsStrings = Object.entries(item.stats).map(([stat, value]) => `${stat}: ${value}`);
            statsCell.textContent = statsStrings.join(', ');
            row.appendChild(statsCell);
        
            tableBody.appendChild(row);
        });
    }

    addItemToShop(item) {
        this.items.push(item);
    }
}
