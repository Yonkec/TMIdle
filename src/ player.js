import { DOMCacheGetOrSet } from "./DOMcache.js";
import { Inventory } from "./inventory.js";

export class Player {
    constructor() {
        this.malk = 1000; 
        this.malkers = 0;
        this.kills = 0;
        this.inventory = new Inventory(this);
        this.inventoryStats = {};
    }

    removeMalk(amount) {
        if (this.malk >= amount) {
            this.malk -= amount;
            return true;
        } else {
            return false;
        }
    }

    addMalk(amount) {
        this.malk += amount;
    }

    addItemToInventory(item) {
        this.inventory.addItem(item);
        this.inventory.populateGrid(); 
        this.inventoryStats = this.inventory.calculateTotalStats();
        this.updateStatsTable();
    }

    // removeItemFromInventory(itemId) {
    //     const itemIndex = this.inventory.findIndex(item => item.id === itemId);
    //     if (itemIndex >= 0) {
    //         this.inventory.splice(itemIndex, 1);
    //         return true;
    //     } else {
    //         return false;
    //     }
    // }

    updateStatsTable() {
        const tableBody = DOMCacheGetOrSet('statsBody');
        
        // clear out existing rows
        while (tableBody.firstChild) {
            tableBody.firstChild.remove();
        }
        
        // Add rows for each stat
        const stats = this.inventoryStats;
        for (let [stat, value] of Object.entries(stats)) {
            const row = document.createElement('tr');
            
            const nameCell = document.createElement('td');
            nameCell.textContent = stat;
            row.appendChild(nameCell);
            
            const valueCell = document.createElement('td');
            valueCell.textContent = value;
            row.appendChild(valueCell);
            
            tableBody.appendChild(row);
        }
    }
}


