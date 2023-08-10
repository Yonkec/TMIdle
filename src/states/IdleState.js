import BaseState from './states/BaseState.js';

export class IdleState extends BaseState {
    constructor() {
        super('Idle');
    }

    update() {
        super.update();
        // logic TBD
    }
}
