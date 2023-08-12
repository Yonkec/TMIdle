import { BaseState } from './BaseState.js';
import { PlayerTurnState } from './PlayerTurnState.js';
import { EnemyTurnState } from './EnemyTurnState.js';

export class BattleState extends BaseState {
    constructor(mob, player) {
        super('Battle');
        this.mob = mob;
        this.player = player;
        this.currentTurn = new PlayerTurnState();
    }

    enter() {
        super.enter();
        this.currentTurn.enter();
    
        this.battleInterval = window.setInterval(() => {
            this.mob.applyDMG(this.player.cachedStats.damage);
        }, 1000);
    }    

    exit() {
        this.currentTurn.exit();
        super.exit();

        window.clearInterval(this.battleInterval);
    }

    update() {
        this.currentTurn.update();
        super.update();
        
    }

    nextTurn() {
        if (this.currentTurn instanceof PlayerTurnState) {
            this.currentTurn.exit();
            this.currentTurn = new EnemyTurnState();
            this.currentTurn.enter();
        } else {
            this.currentTurn.exit();
            this.currentTurn = new PlayerTurnState();
            this.currentTurn.enter();
        }
    }
}
