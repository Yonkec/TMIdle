
import { BattleState } from "./states/BattleState";

export class StateMachine {
    constructor(states = {}, changeStateButton) {
        this.empty = {
            update: function() {},
            enter: function() {},
            exit: function() {}
        };
        this.states = states;
        this.current = this.empty;
        this.buttonText = changeStateButton;
    
    }

    change(stateName, enterParams) {
        if (!this.states[stateName]) {
        throw new Error(`State ${stateName} does not exist`);
        }
        this.current.exit();
        this.current = this.states[stateName]();
        this.current.enter(enterParams);
        this.buttonText.textContent = this.current.name;
    }

    update(dt) {
        if (this.current instanceof BattleState && this.current.isBattleOver()) {
            this.change("death"); // Do we need to break out the different type of so called death states?  Enemy death vs player death etc.
        }else{
            this.current.update(dt);
        }
    }

    nextTurn() {
        if (this.current instanceof BattleState) {
            this.current.nextTurn();
            this.buttonText.textContent = this.current.currentTurn.name;
        }
    }
}