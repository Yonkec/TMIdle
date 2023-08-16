import { DOMCacheGetOrSet } from "./DOMcache.js";
import { applyDMG } from "./combat.js";
import { loadJSONFile } from "./utils.js";

export class Enemy {
    constructor(type, player) {

        this.maxHP = 0;
        this.isDead = false;
        this.type = type;
        this.player = player;
        this.monsterImage = DOMCacheGetOrSet("monster");
        this.healthBar = DOMCacheGetOrSet("enemy-health-bar");

        this.baseStats = [];
        loadJSONFile('database/goblinbrawler.json').then(data => { 
                this.baseStats = data; 
                this.health = this.calcHP(type, player);
        });


        DOMCacheGetOrSet('monster').addEventListener('click', () => applyDMG(this, 1));
        DOMCacheGetOrSet('resetMob').addEventListener('click', () => this.resetMob());
    }
    
    resetMob(){
        if (this.isDead != false && this.health <= 0){
            this.isDead = false;
        }

        this.health = this.calcHP(this.type, this.player);
        
        this.monsterImage.classList.remove("mirrored");
        this.monsterImage.classList.remove("flashing");
        this.healthBar.style.backgroundColor = "green";
    }

    calcHP(type, player){
        //swap to this this once I've properly constructed a type system and corresponding database:
        //return Math.floor(10 * Math.pow(1.02, type.baseHP * type.kills));
        let newHP = Math.floor(10 * Math.pow(1.02, this.baseStats.health * player.kills));
        this.maxHP = newHP;
        return newHP;
    }
}