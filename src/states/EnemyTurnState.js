import { BaseState } from './BaseState.js';

export class EnemyTurnState extends BaseState {
    constructor() {
        super('EnemyTurn');
    }

    enter() {
        super.enter();
        console.log("In the Enemy Turn State");
    }

    exit() {
        super.exit();
        // logic TBD
    }

    update(enemy, player) {
        super.update();
        player.applyDMG(enemy.baseStats.damage);
    }
}
