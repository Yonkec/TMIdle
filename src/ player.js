import { DOMCacheGetOrSet } from "./DOMcache.js";
import { Inventory } from "./inventory.js";

export class Player {
    constructor() {
        this.malk = 1000; 
        this.malkers = 0;
        this.kills = 0;
        this.inventory = new Inventory(this); 
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
}


