import { BaseState } from './BaseState.js';

export class PlayerTurnState extends BaseState {
    constructor() {
        super('PlayerTurn');
    }

    enter() {
        super.enter();
        console.log("In the Player Turn State");
        // logic TBD
    }

    exit() {
        super.exit();
        // logic TBD
    }

    update() {
        super.update();
        // logic TBD
    }
}
