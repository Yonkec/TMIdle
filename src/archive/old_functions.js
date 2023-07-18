function checkDead(){
    if (monsterHP <= 0){
        monsterHP = 0;
    }
    if (monsterHP <= 0 && mobDead == false){
        mobDead = true;
        kills++;
    }
}

function resetMob(){
    if (kills == 0){
        monsterHP = 100;
    }else{
        mobDead = false;
        monsterHP = Math.floor(10 * Math.pow(1.02,baseMonsterHP * kills));
    }
    monsterImage.style.transform = "scaleY(1)";
    monsterImage.classList.remove("flashing");
    healthBar.style.backgroundColor = "green";
}

function malkTheMalk(number){
    malk = malk + number;
    document.getElementById("malk").innerHTML = malk;

    if (number > 0){
        monsterImage.classList.add("shrink");
        monsterHP -= number;

        setTimeout(function() {
            monsterImage.classList.remove("shrink");
        }, 200);
    }
}
