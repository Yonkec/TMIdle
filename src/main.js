/* eslint-disable no-unused-vars */
import { StateMachine } from "./StateMachine.js";
import { BattleState } from "./states/BattleState.js";
import { IdleState } from "./states/IdleState.js";
import { DeathState } from "./states/DeathState.js";

import { DOMCacheGetOrSet } from "./DOMcache.js";

import { openTab, updateHealthBar } from "./interface.js";
import { Enemy } from "./enemy.js";
import { Player } from "./ player.js";
import { Shop } from './shop.js';
import { populateDOMEventCache, updateAllOfTheThings } from "./events.js";
import { populateActionCards } from './actions.js';

//references necessary for function calls from modules
window.openTab = openTab;


//initialize game objects
let player = new Player();
let mob = new Enemy(50, player);
let shop = new Shop(player);

//run initialization events
populateDOMEventCache(player);
populateActionCards();


const changeStateButton = DOMCacheGetOrSet('changeState');

//what is needed to ensure the mob reference is kept updated...need methods in the states to accept that new info?
const states = {
    battle: () => new BattleState(mob, player),
    idle: () => new IdleState(mob, player),
    death: () => new DeathState(mob, player)
};

const stateMachine = new StateMachine(states, changeStateButton);

// Add a click event listener to the button
changeStateButton.addEventListener('click', () => { stateMachine.change('battle'); });

const monsterImage = DOMCacheGetOrSet("monster");
const playerHealthBar = DOMCacheGetOrSet("player-health-bar");
const enemyHealthBar = DOMCacheGetOrSet("enemy-health-bar");

//get rid of this eventually
window.setInterval(function(){
    updateAllOfTheThings(player, mob);
    updateHealthBar(mob, enemyHealthBar, monsterImage);
    updateHealthBar(player, playerHealthBar );
}, 50);
