import { BaseState } from './BaseState.js';

export class BattleState extends BaseState {
    constructor(mob, player) {
        super('Battle');
        this.mob = mob;
        this.player = player;
    }

    enter() {
        super.enter();
    
        this.battleInterval = window.setInterval(() => {
            this.mob.applyDMG(this.player.cachedStats.damage);
        }, 1000);
    }    

    exit() {
        super.exit();

        window.clearInterval(this.battleInterval);
    }

    update() {
        super.update();
        // logic TBD
    }
}
