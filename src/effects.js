export class Effect {
    constructor(id, type, name, attribute, value, duration, isBuff) {
        this.id = id;
        this.type = type;
        this.name = name;
        this.attribute = attribute;
        this.value = value;
        this.duration = duration;
        this.isBuff = isBuff;
    }
}

export function loadEffectsFromJSON () {
    const effects = [];

    fetch('database/effects.json')
        .then(response => response.json())
        .then(effectsArray => {
            effectsArray.forEach(effectData => {
                const { id, type, name, attribute, value, duration, isBuff } = effectData;
                const effect = new Effect(id, type, name, attribute, value, duration, isBuff);
                effects.push(effect);
            });
            console.log(effects);
        return effects;
    });
}