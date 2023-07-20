import { DOMCacheGetOrSet } from "./DOMcache.js";

export class Enemy {
    constructor(type, player) {
        this.health = this.calcHP(type, player);
        this.maxHP = this.health;
        this.isDead = false;
        this.type = type;
        this.player = player;
        this.monsterImage = document.getElementById("monster");
        this.healthBar = document.getElementById("health-bar");

        DOMCacheGetOrSet('monster').addEventListener('click', () => this.applyDMG(1));
        DOMCacheGetOrSet('resetMob').addEventListener('click', () => this.resetMob());
    }

    applyDMG(dmgAMT){ //receive dmg events and apply them to the instance / trigger related on-death events
        this.health -= dmgAMT;
        this.player.malk++;
        
        if (this.health  <= 0 && this.isDead == false){
            this.health  = 0;
            this.isDead = true;
            this.player.kills++;
            //type.kills++;
            console.log(this.player.kills);
        }
    }
    
    resetMob(){
        if (this.isDead == false){
            this.health = this.maxHP; //reset current mob for testing purposes - remove for PRD
        }else{
            this.isDead = false;
            this.health = this.calcHP(this.type, this.player); //reset mob with increased HP based on type and kill count.
        }
        this.monsterImage.style.transform = "scaleY(1)";
        this.monsterImage.classList.remove("flashing");
        this.healthBar.style.backgroundColor = "green";
    }

    calcHP(type, player){
        //swap to this this once I've properly constructed a type system and corresponding database:
        //return Math.floor(10 * Math.pow(1.02, type.baseHP * type.kills));

        return Math.floor(10 * Math.pow(1.02, type));
    }
}