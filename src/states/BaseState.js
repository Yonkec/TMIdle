export class BaseState {
    name;

    constructor(name) {
        this.name = name;
    }

    enter() {
        console.log(`Entering ${this.name} state.`);
    }

    exit() {
        console.log(`Exiting ${this.name} state.`);
    }

    update() {
        console.log(`Updating ${this.name} state.`);
    }
}