
var malk = 0;
var malkers = 0;
var baseMonsterHP = 100;
var monsterHP = 100;
var kills = 0;
var mobDead = false;

//need to refactor this into a long term state managed solution
onLoad();

const monsterImage = document.getElementById("monster");
const healthBar = document.getElementById("health-bar");

function malkTheMalk(number){
    malk = malk + number;
    document.getElementById("malk").innerHTML = malk;

    if (number > 0){
        monsterImage.classList.add("shrink");
        monsterHP -= number;

        setTimeout(function() {
            monsterImage.classList.remove("shrink");
        }, 200);

        combat.checkDead();
    }
}


function buyMalker(){
    var malkerCost = Math.floor(10 * Math.pow(1.1,malkers));
    if(malk >= malkerCost){
        malkers++;
        malk = malk - malkerCost;
    };
}

function checkDead(){
    if (monsterHP <= 0){
        monsterHP = 0;
    }
    if (monsterHP <= 0 && mobDead == false){
        mobDead = true;
        kills++;
    }
}

function resetMob(){
    if (kills == 0){
        monsterHP = 100;
    }else{
        mobDead = false;
        monsterHP = Math.floor(10 * Math.pow(1.02,baseMonsterHP * kills));
    }
    monsterImage.style.transform = "scaleY(1)";
    monsterImage.classList.remove("flashing");
    healthBar.style.backgroundColor = "green";
}

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

function loadGame(){
    var savegame = JSON.parse(localStorage.getItem("TMSaveData")); 
    
    if (typeof savegame.malk != null){
        malk = savegame.malk;
    };

    if (typeof savegame.malkers != null){
        malkers = savegame.malkers;
    };

    return malk, malkers;
}

function openTab(evt, tabName) {
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablink");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
} 

function onLoad(){
    document.getElementById("defaultOpen").click();
}

window.setInterval(function(){
    updateStuff();
    updateHealthBar(monsterHP);
}, 5);

window.setInterval(function(){
	malkTheMalk(malkers);
}, 1000);



// window.setInterval(function(){
//     saveGame(malk, malkers);
// }, 10000);