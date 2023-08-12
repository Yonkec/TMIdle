import { BaseState } from './BaseState.js';

export class PlayerTurnState extends BaseState {
    constructor() {
        super('PlayerTurn');
    }

    enter() {
        super.enter();
        console.log("In the Player Turn State");
    }

    exit() {
        super.exit();
        // logic TBD
    }

    update(enemy, player) {
        super.update();
        enemy.applyDMG(player.cachedStats.damage);
    }
}
