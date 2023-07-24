import machina from 'machina';
import { DOMCacheGetOrSet } from "./DOMcache.js";

import { openTab, updateHealthBar } from "./interface.js";
import { Enemy } from "./enemy.js";
import { Player } from "./ player.js";
import { populateDOMCache } from "./events.js";
import { buyMalker } from "./generators.js";


//references necessary for function calls from modules
window.openTab = openTab;

 
//initialize game objects
let player = new Player();
let mob = new Enemy(50, player);

const monsterImage = DOMCacheGetOrSet("monster");
const healthBar = DOMCacheGetOrSet("health-bar");

//ultimately need a state machine
onLoad();


//kick these two update methods to their own file once the player object is available to pass in
function updateStuff(){
    DOMCacheGetOrSet('malk').innerHTML = player.malk;
    DOMCacheGetOrSet('malkers').innerHTML = player.malkers;
    DOMCacheGetOrSet('monsterHP').innerHTML = mob.health;
    DOMCacheGetOrSet('totalKills').innerHTML = player.kills;

    let nextCost = Math.floor(10 * Math.pow(1.1,player.malkers));
    DOMCacheGetOrSet('malkerCost').innerHTML = nextCost;
}

function onLoad(){
    populateDOMCache();
    DOMCacheGetOrSet('buyMalker').addEventListener('click', () => buyMalker(player));
    DOMCacheGetOrSet('tabButtonFight').click();
}

window.setInterval(function(){
    updateStuff();
    updateHealthBar(mob, monsterImage, healthBar);
}, 50);

window.setInterval(function(){
	mob.applyDMG(player.malkers); //need to transition to a state machine and create/update mob objects in the play state
}, 1000);


// window.setInterval(function(){
//     saveGame(malk, malkers);
// }, 10000);