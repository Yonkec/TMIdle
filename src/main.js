/* eslint-disable no-unused-vars */
import { StateMachine } from "./StateMachine.js";
import { BattleState } from "./states/BattleState.js";
import { IdleState } from "./states/IdleState.js";
import { DeathState } from "./states/DeathState.js";

import { DOMCacheGetOrSet } from "./DOMcache.js";
import { computeDeltaTime } from "./utils.js";

import { openTab, updateHealthBar, updateArmorBar, updateManaBar } from "./interface.js";
import { Enemy } from "./enemy.js";
import { Player } from "./player.js";
import { Shop } from './shop.js';
import { populateDOMEventCache, updateAllOfTheThings } from "./events.js";
import { ActionQueueManager } from './actions.js';

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

// initialize game objects
let player = new Player();
let enemy = new Enemy(50, player);
let shop = new Shop(player);
const actionQueueManager = new ActionQueueManager();
const stateMachine = new StateMachine(states, changeStateButton);

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

    requestAnimationFrame(gameLoop); 
}

gameLoop();