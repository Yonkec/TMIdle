export class Modifier {
    constructor(id, statsAffected, duration = null, condition = null) {
        this.id = id;
        // statsAffected is now an object: { strength: 2, agility: -1 }

        this.statsAffected = statsAffected;
        this.duration = duration;
        this.condition = condition;
    }
}