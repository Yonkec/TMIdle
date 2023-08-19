import { BaseState } from './BaseState.js';
import { processAction } from '../combat.js';

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
            let currentAction = actionQueue.returnNextAction()

            processAction(currentAction, player, enemy)
        }
    }
}
