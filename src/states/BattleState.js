import { BaseState } from './BaseState.js';
import { PlayerTurnState } from './PlayerTurnState.js';
import { EnemyTurnState } from './EnemyTurnState.js';

export class BattleState extends BaseState {
    constructor(enemy, player, actionQueue) {
        super('Battle');
        this.enemy = enemy;
        this.player = player;
        this.currentTurn = new PlayerTurnState();
        this.battleTimer = 0;
        this.actionQueue = actionQueue;
    }

    enter() {
        super.enter();
        this.currentTurn.enter();
    }    

    exit() {
        this.currentTurn.exit();
        super.exit();

        window.clearInterval(this.battleInterval);
    }

    update(dt) {
        this.battleTimer += dt;

        if (this.battleTimer >= 1) {

            this.battleTimer = 0; //reset turn
            super.update();

            this.currentTurn.update(this.enemy, this.player, this.actionQueue);
            this.nextTurn();
        }
    }

    isBattleOver() {
        return this.player.isDead || this.enemy.isDead;
    }

    resetForNewBattle(player, enemy) {
        this.enemy = enemy
        this.player = player;
        this.currentTurn = new PlayerTurnState();
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
