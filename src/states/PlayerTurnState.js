import { BaseState } from './BaseState.js';
import { applyDMG, calculateAttackDMG } from '../combat.js';

export class PlayerTurnState extends BaseState {
    constructor() {
        super('PlayerTurn');
    }

    enter() {
        super.enter();
        //console.log("In the Player Turn State");
    }

    exit() {
        super.exit();
        // logic TBD
    }

    update(enemy, player, actionQueue) {
        super.update();

        if (actionQueue.actionQueue.length > 0){
            console.log(actionQueue.currentActionIndex);
            console.log(`Calling the ${actionQueue.returnNextAction().title} action.`);
        }

        let damageThisTurn = calculateAttackDMG(player, enemy);
        applyDMG(enemy, damageThisTurn);
    }
}
