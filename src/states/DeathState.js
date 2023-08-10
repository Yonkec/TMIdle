import { BaseState } from './states/BaseState.js';

export class DeathState extends BaseState {
    constructor() {
        super('Death');
    }

    update() {
        super.update();
        // logic TBD
    }
}
