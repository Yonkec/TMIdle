import { openTab } from "./interface.js";
import { Enemy } from "./enemy.js";

//references necessary for function calls from modules
window.openTab = openTab;

var malk = 0;
var malkers = 0;
//var baseMonsterHP = 100;
var monsterHP = 100;
var kills = 0;
//var mobDead = false;

var player = {
    malk: 0.0,
    malkers: 0
};

//need to refactor this into a state managed solution
onLoad();


const monsterImage = document.getElementById("monster");
const healthBar = document.getElementById("health-bar");


function buyMalker(){ //need to create a player object to store the currencies and an inventory of generators
    var malkerCost = Math.floor(10 * Math.pow(1.1,player.malkers));
    if(player.malk >= malkerCost){
        player.malkers++;
        player.malk = player.malk - malkerCost;
    };
}


//kick these two update methods to their own file once the player object is available to pass in
function updateStuff(){
    document.getElementById('malk').innerHTML = malk;
    document.getElementById('malkers').innerHTML = malkers;
    document.getElementById('monsterHP').innerHTML = monsterHP;
    document.getElementById('totalKills').innerHTML = kills;

    var nextCost = Math.floor(10 * Math.pow(1.1,malkers));
    document.getElementById('malkerCost').innerHTML = nextCost;
}

function updateHealthBar(health) {
    var healthBar = document.getElementById("health-bar");
    var screenWidth = window.innerWidth; // Get the viewport width
    var maxWidth = screenWidth * 0.5; // Set the maximum width to 50% of the screen width
    var calculatedWidth = maxWidth * (monsterHP / 100); // Calculate the width based on the health percentage
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
    var mob = new Enemy(50, player);
}

window.setInterval(function(){
    updateStuff();
    updateHealthBar(monsterHP);
}, 5);

window.setInterval(function(){
	malkTheMalk(malkers); //swap this with class method route
}, 1000);


// window.setInterval(function(){
//     saveGame(malk, malkers);
// }, 10000);