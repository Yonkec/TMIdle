import { openTab } from "./interface.js";
import { Enemy } from "./enemy.js";
import { Player } from "./ player.js";
import { DOMCacheGetOrSet } from "./DOMcache.js";


//references necessary for function calls from modules
window.openTab = openTab;


//initialize game objects
let player = new Player();
let mob = new Enemy(50, player);


//ultimately need a state machine
onLoad();


const monsterImage = document.getElementById("monster");
const healthBar = document.getElementById("health-bar");


function buyMalker(){
    let malkerCost = Math.floor(10 * Math.pow(1.1,player.malkers));
    if(player.malk >= malkerCost){
        player.malkers++;
        player.malk = player.malk - malkerCost;
    };
}


//kick these two update methods to their own file once the player object is available to pass in
function updateStuff(){
    document.getElementById('malk').innerHTML = player.malk;
    document.getElementById('malkers').innerHTML = player.malkers;
    document.getElementById('monsterHP').innerHTML = mob.health;
    document.getElementById('totalKills').innerHTML = player.kills;

    let nextCost = Math.floor(10 * Math.pow(1.1,player.malkers));
    document.getElementById('malkerCost').innerHTML = nextCost;
}

function updateHealthBar(health) {
    let healthBar = document.getElementById("health-bar");
    let screenWidth = window.innerWidth; // Get the viewport width
    let maxWidth = screenWidth * 0.5; // Set the maximum width to 50% of the screen width
    let calculatedWidth = maxWidth * (mob.health / 100); // Calculate the width based on the health percentage
    healthBar.style.width = calculatedWidth + "px"; // Set the width in pixels

    if (health <= 0) {
        monsterImage.style.transform = "scaleY(-1)";
        monsterImage.classList.add("flashing");
        healthBar.style.backgroundColor = "red";
    } else if (health < 30) {
        healthBar.style.backgroundColor = "orange";
    }
}

function onLoad(){
    document.getElementById("defaultOpen").click();
}

window.setInterval(function(){
    updateStuff();
    updateHealthBar(mob.health);
}, 5);

window.setInterval(function(){
	mob.applyDMG(player.malkers); //need to transition to a state machine and create/update mob objects in the play state
}, 1000);


// window.setInterval(function(){
//     saveGame(malk, malkers);
// }, 10000);