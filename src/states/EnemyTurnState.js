import { BaseState } from './BaseState.js';
import { applyDMG } from '../combat.js';

export class EnemyTurnState extends BaseState {
    constructor() {
        super('EnemyTurn');
    }

    enter() {
        super.enter();
        //console.log("In the Enemy Turn State");
    }

    exit() {
        super.exit();
        // logic TBD
    }

    update(enemy, player) {
        super.update();
        applyDMG(player, enemy.baseStats.damage);
    }
}
