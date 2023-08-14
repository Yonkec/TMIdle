
export function applyDMG(unit, dmgAmount){
        
    let dmgAMT = dmgAmount;

    if (unit.health - dmgAMT <= 0 && unit.isDead == false){
        unit.health  = 0;
        unit.isDead = true;
        console.log("You died.");

    } else if (unit.isDead == false) {
        unit.health -= dmgAMT;
        if(unit.monsterImage){
            unit.monsterImage.classList.add("shrink");

            setTimeout(() => {
                unit.monsterImage.classList.remove("shrink");
            }, 150);
        }
    }

    return dmgAMT;
}