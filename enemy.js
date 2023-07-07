class Enemy {
    constructor(type, player, UI) {
        this.HP = calcHP(type, player);
        this.maxHP = this.HP;
        this.isDead = false;
        this.UI = UI;
    }

    checkDead(){ //determine if we've killed the mob actively or passively
        if (this.HP  <= 0){
            this.HP  = 0;
        }
        if (this.HP  <= 0 && this.isDead == false){
            this.isDead = true;
            player.kills++;
            type.kills++;
        }
    }
    
    resetMob(){
        if (this.isDead == false){
            this.HP = this.maxHP; //reset current mob for testing purposes - remove for PRD
        }else{
            mobDead = false;
            this.HP = calcHP(type, player); //reset mob with increased HP based on type and kill count.
        }
        this.UI.monsterImage.style.transform = "scaleY(1)";
        this.UI.monsterImage.classList.remove("flashing");
        this.UI.healthBar.style.backgroundColor = "green";
    }

    calcHP(type, player){
        //monsterHP = Math.floor(10 * Math.pow(1.02,baseMonsterHP * kills));
    }


}