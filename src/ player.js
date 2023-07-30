import { DOMCacheGetOrSet } from "./DOMcache.js";

export class Player {
    constructor() {
        this.malk = 0;
        this.malkers = 0;
        this.kills = 0;
        this.inventory = [];
    }

    runIdleCalcs(enemy){
        enemy.health -= player.malkers;
    }

    addInventory(item) {
        this.inventory.push(item);
    }

    removeInventory(item) {
        this.inventory.pop(item);
    }

    removeMalk(amount) {
        this.malk -= amount;
    }

    addMalk(amount) {
        this.malk += amount;
    }
    
}

