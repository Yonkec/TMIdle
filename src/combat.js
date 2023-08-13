
export function applyDMG(unit, dmgAmount){
        
    let dmgAMT = dmgAmount;

    if (unit.health - dmgAMT <= 0 && unit.isDead == false){
        unit.health  = 0;
        unit.isDead = true;
        console.log("You died.");

    } else if (unit.isDead == false) {
        unit.health -= dmgAMT;
    }

    return dmgAMT;
}