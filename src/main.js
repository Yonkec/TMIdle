import machina from 'machina';
import { DOMCacheGetOrSet } from "./DOMcache.js";

import { openTab, updateHealthBar } from "./interface.js";
import { Enemy } from "./enemy.js";
import { Player } from "./ player.js";
import { Shop } from './shop.js';
import { populateDOMCache } from "./events.js";
import { buyMalker } from "./generators.js";


//references necessary for function calls from modules
window.openTab = openTab;


//state machine testing
const changeStateButton = DOMCacheGetOrSet('changeState');


const gameFsm = new machina.Fsm({
    initialState: "idle",
    states: {
        idle: {
            _onEnter: function() {
                // add functions that should be triggered when the idle state starts
            },
            _onExit: function() {
                // add functions that should be triggered when exiting the idle state
            },
            togglestate: function() {
                this.transition('battle');
            }
        },
        battle: {
            _onEnter: function(enemy) {
                this.battleInterval = window.setInterval(function(){
                    mob.applyDMG(player.cachedStats.damage); //need to transition to a state machine and create/update mob objects in the play state
                }, 1000);
            },
            _onExit: function() {
                window.clearInterval(this.battleInterval);
            },
            togglestate: function() {
                this.transition('idle');
            }
        }
    }
});

// Function to update the button text based on the current state
function updateButtonText(state) {
    changeStateButton.textContent = state;
}

// Call the updateButtonText function initially to set the initial button text
updateButtonText(gameFsm.state);

// Add a click event listener to the button
changeStateButton.addEventListener('click', () => { gameFsm.handle('togglestate'); });

// Set up the _onChange callback to update button text on state change
gameFsm.on('transition', function () { updateButtonText(gameFsm.state); });


//initialize game objects
let player = new Player();
let mob = new Enemy(50, player);
let shop = new Shop(player);

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
