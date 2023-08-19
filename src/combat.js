//update this as new action types are implemented, ensuring an associated function is also developed below
const actionHandlers = {
    attack: processAttack,
    defensive: processDefensive,
    heal: processHeal,
    utility: processUtility,
};

//is this needed or should all of this be moved into the control of processAction and its children?
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

//deprecating this asap and moving to processAction
export function calculateAttackDMG(attacker, defender) {
    let dmgAMT = attacker.getStat('damage') - (defender.getStat('sta') / 2);
    return dmgAMT;
}

export function processAction(action, source, target) {
    const handler = actionHandlers[action.category];

    if (handler) {
        handler(action, source, target);
    } else {
        console.error(`Unexpected action category: ${action.category}`);
    }
}

export function processAttack(action, source, target) {
    let dmgAMT = (action.damage * source.getStat('damage') - (target.getStat('sta') / 2));
    applyDMG(target, dmgAMT);
}

export function processHeal(action, source) {
    let healAMT = action.healAmount * (source.getStat('wis') / 2);
    source.health += healAMT;
}

export function processDefensive(action, source) {
    let armorBoost = action.defenseValue;
    source.armor += armorBoost;
}

export function processUtility(action, source, target) {
    console.log(action, source, target);
}