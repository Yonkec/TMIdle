import machina from 'machina';
import { DOMCacheGetOrSet } from "./DOMcache.js";

import { openTab, updateHealthBar } from "./interface.js";
import { Enemy } from "./enemy.js";
import { Player } from "./ player.js";
import { populateDOMCache } from "./events.js";
import { buyMalker } from "./generators.js";


//references necessary for function calls from modules
window.openTab = openTab;


//state machine testing

const changeStateButton = document.getElementById('changeState');

const myStateMachine = new machina.Fsm({
    initialState: 'paused',
    states: {
    paused: {
        changeState: 'running',
        _onEnter() {
        console.log('State changed to paused');
        }
    },
    running: {
        changeState: 'paused',
        _onEnter() {
        console.log('State changed to running');
        }
    }
    },
    // Custom handler to update the button text based on the current state
    buttonTextHandler(state) {
        changeStateButton.textContent = state;
    }
});

// Function to update the button text based on the current state
function updateButtonText(state) {
    const changeStateButton = document.getElementById('changeState');
    changeStateButton.textContent = state;
}

// Add a click event listener to the button
changeStateButton.addEventListener('click', () => {
myStateMachine.handle('changeState');
});

// Call the updateButtonText function initially to set the initial button text
updateButtonText(myStateMachine.state);

// Set up the _onChange callback to update button text on state change
myStateMachine.on('transition', function () {
updateButtonText(myStateMachine.state);
});


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
