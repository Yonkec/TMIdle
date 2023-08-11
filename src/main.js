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
import { populateDOMCache } from "./events.js";
import { buyMalker } from "./generators.js";
import { populateActionCards } from './actions.js';


//references necessary for function calls from modules
window.openTab = openTab;

//initialize game objects
let player = new Player();
let mob = new Enemy(50, player);
let shop = new Shop(player);

//state machine testing
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


//ultimately need a state machine
onLoad();


//kick these two update methods to their own file once the player object is available to pass in
function updateStuff(){
    DOMCacheGetOrSet('malk').innerHTML = player.malk;
    DOMCacheGetOrSet('malkers').innerHTML = player.malkers;
    DOMCacheGetOrSet('enemyHP').innerHTML = mob.health;
    DOMCacheGetOrSet('totalKills').innerHTML = player.kills;

    let nextCost = Math.floor(10 * Math.pow(1.1,player.malkers));
    DOMCacheGetOrSet('malkerCost').innerHTML = nextCost;
}

function onLoad(){
    populateDOMCache();
    DOMCacheGetOrSet('buyMalker').addEventListener('click', () => buyMalker(player));
    DOMCacheGetOrSet('tabButtonFight').click();
    populateActionCards();
}

window.setInterval(function(){
    updateStuff();
    updateHealthBar(mob, enemyHealthBar, monsterImage);
    updateHealthBar(player, playerHealthBar );
}, 50);
