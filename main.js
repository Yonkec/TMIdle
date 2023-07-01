var malk = 0;
var malkers = 0;
var monsterHP = 10;

const monsterImage = document.getElementById("monster");
const healthBar = document.getElementById("health-bar");

monsterImage.addEventListener("click", function() {
    monsterImage.classList.add("shrink");
    monsterHP -= 1;

    setTimeout(function() {
        monsterImage.classList.remove("shrink");
    }, 200);
});

function malkTheMalk(number){
    malk = malk + number;
    document.getElementById("malk").innerHTML = malk;
}

function saveGame(){
    var saveData = {
        malk: malk,
        malkers: malkers
    };

    localStorage.setItem("TickleMilkSaveData",JSON.stringify(saveData)); 
}

function loadGame(){
    var savegame = JSON.parse(localStorage.getItem("TickleMilkSaveData")); 
    
    if (typeof savegame.malk != null){
        malk = savegame.malk;
    };

    if (typeof savegame.malkers != null){
        malkers = savegame.malkers;
    };
}

function buyMalker(){
    var malkerCost = Math.floor(10 * Math.pow(1.1,malkers));
    if(malk >= malkerCost){
        malkers = malkers + 1;
        malk = malk - malkerCost;
    };
}

function updateStuff(){
    document.getElementById('malk').innerHTML = malk;
    document.getElementById('malkers').innerHTML = malkers;

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
      } else {
        monsterImage.style.transform = "scaleY(1)";
        monsterImage.classList.remove("flashing");
      }
  }

window.setInterval(function(){
	
	malkTheMalk(malkers);
    updateStuff();
    updateHealthBar(monsterHP);
	
}, 5);

window.setInterval(function(){

    saveGame();

}, 10000);