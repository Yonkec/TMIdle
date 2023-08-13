/* eslint-disable no-unused-vars */
import { StateMachine } from "./StateMachine.js";
import { BattleState } from "./states/BattleState.js";
import { IdleState } from "./states/IdleState.js";
import { DeathState } from "./states/DeathState.js";

import { DOMCacheGetOrSet } from "./DOMcache.js";
import { computeDeltaTime } from "./utils.js";

import { openTab, updateHealthBar } from "./interface.js";
import { Enemy } from "./enemy.js";
import { Player } from "./ player.js";
import { Shop } from './shop.js';
import { populateDOMEventCache, updateAllOfTheThings } from "./events.js";
import { ActionQueueManager } from './actions.js';

// references necessary for function calls from modules
window.openTab = openTab;

// initialize vars
const changeStateButton = DOMCacheGetOrSet('changeState');
const monsterImage = DOMCacheGetOrSet("monster");
const playerHealthBar = DOMCacheGetOrSet("player-health-bar");
const enemyHealthBar = DOMCacheGetOrSet("enemy-health-bar");
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
    updateHealthBar(enemy, enemyHealthBar, monsterImage);
    updateHealthBar(player, playerHealthBar );

    stateMachine.update(dt);

    requestAnimationFrame(gameLoop); 
}

gameLoop();