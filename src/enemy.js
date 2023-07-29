import { DOMCacheGetOrSet } from "./DOMcache.js";

export class Enemy {
    constructor(type, player) {
        this.maxHP = 0;
        this.health = this.calcHP(type, player);
        this.isDead = false;
        this.type = type;
        this.player = player;
        this.monsterImage = document.getElementById("monster");
        this.healthBar = document.getElementById("health-bar");

        DOMCacheGetOrSet('monster').addEventListener('click', () => this.applyDMG(1));
        DOMCacheGetOrSet('resetMob').addEventListener('click', () => this.resetMob());
    }

    applyDMG(dmgAMT){ //receive dmg events and apply them to the instance / trigger related on-death events
        
        if (this.health  <= 0 + dmgAMT && this.isDead == false){
            this.health  = 0;
            this.isDead = true;
            this.player.kills++;
            //type.kills++; //is it necessary to break out mobs by type and track statistics separately?
            console.log(this.player.kills);
        } else if (this.isDead == false) {
            this.health -= dmgAMT;
            this.player.malk += dmgAMT;
            this.monsterImage.classList.add("shrink");

            setTimeout(() => {
                this.monsterImage.classList.remove("shrink");
            }, 150);
        }
    }
    
    resetMob(){
        if (this.isDead == false && this.health > 0){
            this.health = this.maxHP; //reset current mob for testing purposes - remove for PRD
        }else{
            this.isDead = false;
            this.health = this.calcHP(this.type, this.player); //reset mob with increased HP based on type and kill count.
        }
        this.monsterImage.classList.remove("mirrored");
        this.monsterImage.classList.remove("flashing");
        this.healthBar.style.backgroundColor = "green";
    }

    calcHP(type, player){
        //swap to this this once I've properly constructed a type system and corresponding database:
        //return Math.floor(10 * Math.pow(1.02, type.baseHP * type.kills));
        let newHP = Math.floor(10 * Math.pow(1.02, type * player.kills));
        this.maxHP = newHP;
        return newHP;
    }
}