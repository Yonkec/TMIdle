import { DOMCacheGetOrSet } from "./DOMcache.js";
import { Inventory } from "./inventory.js";
//import { Modifier } from "./modifiers.js";
import { updateStatsTable } from "./interface.js";
import { loadJSONFile } from "./utils.js";

export class Player {
    constructor() {
        this.maxHP = 100.0;
        this.health = 100.0;
        this.isDead = false;

        this.coins = 1000; 
        this.coinGens = 0;
        this.kills = 0;
        this.inventory = new Inventory(this);
        this.inventoryStats = {};

        this.healthBar = DOMCacheGetOrSet("player-health-bar");

        loadJSONFile('database/player.json').then(data => { 
            this.baseStats = data; 
            this.cachedStats = { ...this.baseStats };
        });

        this.modifiers = [];
    }

    // addModifier(modifier) {
    //     this.modifiers.push(modifier);
    //     this.recalculateCachedStats(Object.keys(modifier.statsAffected));
    // }

    // removeModifier(modifierId) {
    //     const index = this.modifiers.findIndex(mod => mod.id === modifierId);
    //     if (index !== -1) {
    //         const [removedModifier] = this.modifiers.splice(index, 1);
    //         this.recalculateCachedStats(Object.keys(removedModifier.statsAffected));
    //     }
    // }

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
    
    removeCoins(amount) {
        if (this.coins >= amount) {
            this.coins -= amount;
            return true;
        } else {
            return false;
        }
    }

    addCoins(amount) {
        this.coins += amount;
    }


    addItemToInventory(item) {
        this.inventory.addItem(item);
        this.inventory.populateGrid(); 
        this.inventoryStats = this.inventory.calculateTotalStats();
        updateStatsTable(this.inventoryStats);
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


