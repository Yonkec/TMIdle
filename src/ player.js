import { DOMCacheGetOrSet } from "./DOMcache.js";
import { Inventory } from "./inventory.js";
import { Modifier } from "./modifiers.js";

export class Player {
    constructor() {
        this.malk = 1000; 
        this.malkers = 0;
        this.kills = 0;
        this.inventory = new Inventory(this);
        this.inventoryStats = {};

        this.baseStats = {
            str:	1,
            sta:	1,
            agi:	1,
            dex:	1,
            wis:	1,
            int:	1,
            cha:	1,
            health:	10,
            damage:	1
        };

        this.cachedStats = { ...this.baseStats };
        this.modifiers = [];
    }

    addModifier(modifier) {
        this.modifiers.push(modifier);
        this.recalculateCachedStats(Object.keys(modifier.statsAffected));
    }

    removeModifier(modifierId) {
        const index = this.modifiers.findIndex(mod => mod.id === modifierId);
        if (index !== -1) {
            const [removedModifier] = this.modifiers.splice(index, 1);
            this.recalculateCachedStats(Object.keys(removedModifier.statsAffected));
        }
    }

    getStat(statName) {
        return this.cachedStats[statName];
    }

    recalculateCachedStats(statsAffectedArray) {
        for (let stat of statsAffectedArray) {
            this.cachedStats[stat] = this.baseStats[stat];

            for (let modifier of this.modifiers) {
                if (modifier.statsAffected[stat] && (!modifier.condition || modifier.condition())) {
                    this.cachedStats[stat] += modifier.statsAffected[stat];
                }
            }
        }
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


