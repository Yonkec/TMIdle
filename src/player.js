import { DOMCacheGetOrSet } from "./DOMcache.js";
import { Inventory } from "./inventory.js";
//import { Modifier } from "./modifiers.js";
import { updateStatsTable } from "./interface.js";
import { loadJSONFile } from "./utils.js";

export class Player {
    constructor() {
        this.maxHP = 100.0;
        this.maxAP = 100.0;
        this.maxMP = 100.0;
        this.health = 100.0;
        this.isDead = false;
        this.armor = 10;
        this.mana = 10;
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

        this.activeEffects = [];
    }

    //undecided on how to structure effects, going with a record+int approach for now
    applyEffect(effect) {
        this.activeEffects.push({
            effect: effect,
            remainingDuration: effect.duration
        });
    }

    updateEffects() {
        for (let i = this.activeEffects.length - 1; i >= 0; i--) {
            const activeEffect = this.activeEffects[i];
            activeEffect.remainingDuration--;

            if (activeEffect.remainingDuration <= 0) {
                //remove effect here, but does this cancel it midway in the current tick?
                //this might remove it and steal the benefit/penalty of the final tick - TBD
                this.activeEffects.splice(i, 1);
            }
        }
    }

    getStat(statName) {
        return this.cachedStats[statName];
    }

    recalculateCachedStats(statsArray) {
        for (const stat in statsArray) {
            this.cachedStats[stat] = this.baseStats[stat] + this.inventoryStats[stat];
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

        this.recalculateCachedStats(this.inventoryStats);
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


