
export class StateMachine {
    constructor(states = {}) {
        this.empty = {
            render: function() {},
            update: function() {},
            enter: function() {},
            exit: function() {}
        };
        this.states = states;
        this.current = this.empty;
    }

    change(stateName, enterParams) {
        if (!this.states[stateName]) {
        throw new Error(`State ${stateName} does not exist`);
        }
        this.current.exit();
        this.current = this.states[stateName]();
        this.current.enter(enterParams);
    }

    update(dt) {
        this.current.update(dt);
    }
}