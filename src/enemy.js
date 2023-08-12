import { DOMCacheGetOrSet } from "./DOMcache.js";

export class Enemy {
    constructor(type, player) {

        this.maxHP = 0;
        this.isDead = false;
        this.type = type;
        this.player = player;
        this.monsterImage = DOMCacheGetOrSet("monster");
        this.healthBar = DOMCacheGetOrSet("enemy-health-bar");

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

        this.health = this.calcHP(type, player);

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
            this.player.coins += dmgAMT;
            this.monsterImage.classList.add("shrink");

            setTimeout(() => {
                this.monsterImage.classList.remove("shrink");
            }, 150);
        }
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