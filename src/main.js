/* eslint-disable no-unused-vars */
import { StateMachine } from "./StateMachine.js";
import { BattleState } from "./states/BattleState.js";
import { IdleState } from "./states/IdleState.js";
import { DeathState } from "./states/DeathState.js";

import { DOMCacheGetOrSet } from "./DOMcache.js";
import { computeDeltaTime } from "./utils.js";

import Konva from "konva";

import { openTab, updateHealthBar, updateArmorBar, updateManaBar } from "./interface.js";
import { Enemy } from "./enemy.js";
import { Player } from "./player.js";
import { Shop } from './shop.js';
import { populateDOMEventCache, updateAllOfTheThings } from "./events.js";
import { ActionQueueManager } from './actions.js';
import { loadEffectsFromJSON } from "./effects.js";

// references necessary for function calls from modules
window.openTab = openTab;

// initialize vars
const changeStateButton = DOMCacheGetOrSet('changeState');
const monsterImage = DOMCacheGetOrSet("monster");

//need to move this out of the gameplay loop and look into updating these only on state changes
const playerHealthBar = DOMCacheGetOrSet("player-health-bar");
const enemyHealthBar = DOMCacheGetOrSet("enemy-health-bar");
const playerArmorBar = DOMCacheGetOrSet("player-armor-bar");
const enemyArmorBar = DOMCacheGetOrSet("enemy-armor-bar");
const playerManaBar = DOMCacheGetOrSet("player-mana-bar");
const enemyManaBar = DOMCacheGetOrSet("enemy-mana-bar");

const states = {
    battle: () => new BattleState(enemy, player, actionQueueManager),
    idle: () => new IdleState(enemy, player, actionQueueManager),
    death: () => new DeathState(enemy, player, actionQueueManager)
};

const CombatEffects = loadEffectsFromJSON();

// initialize game objects
let player = new Player();
let enemy = new Enemy(50, player);
let shop = new Shop(player);
const actionQueueManager = new ActionQueueManager();
const stateMachine = new StateMachine(states, changeStateButton);


// Create a Konva stage
let stage = new Konva.Stage({
    container: 'konvaCanvas',
    width: window.innerWidth,
    height: window.innerHeight * .35
});

// Create a Konva layer
let layer = new Konva.Layer();
stage.add(layer);

Konva.Image.fromURL('assets/images/char1.png', function (characterImage) {
    characterImage.setAttrs({
        x: 500,
        y: 200,
        scaleX: -.4,
        scaleY: .4
    });
    layer.add(characterImage);
});

Konva.Image.fromURL('assets/images/enemies/rat1.png', function (enemyImage) {
    enemyImage.setAttrs({
        x: 800,
        y: 100,
        scaleX: .4,
        scaleY: .4
    });
    layer.add(enemyImage);
});




// run initialization events
populateDOMEventCache(player);
actionQueueManager.populateActionCards();

// add a click event listener to the button
changeStateButton.addEventListener('click', () => { stateMachine.change('battle'); });

function gameLoop() {
    const dt = computeDeltaTime();

    updateAllOfTheThings(player, enemy);

    //stop doing this per frame this only changes per combat state
    updateHealthBar(player, playerHealthBar );
    updateArmorBar(player, playerArmorBar );
    updateManaBar(player, playerManaBar);

    updateHealthBar(enemy, enemyHealthBar, monsterImage);
    updateArmorBar(enemy, enemyArmorBar );
    updateManaBar(enemy, enemyManaBar);

    stateMachine.update(dt);


    stage.draw();

    requestAnimationFrame(gameLoop); 
}

gameLoop();