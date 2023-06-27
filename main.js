var malk = 0;
var malkers = 0;

function malkTheMalk(number){
    malk = malk + number;
    document.getElementById("malk").innerHTML = malk;
};

function saveGame(){
    var saveData = {
        malk: malk,
        malkers: malkers
    }
}

function loadGame(){
    var savegame = JSON.parse(localStorage.getItem("saveData")); 
    
    if (typeof savegame.cookies !== "undefined"){
        malk = savegame.malk;
        malkers = savegame.malkers;
    }
}

function buyMalker(){
    var malkerCost = Math.floor(10 * Math.pow(1.1,malkers));
    if(malkers >= malkerCost){
        malkers = malkers + 1;
    	malk = malk - malkerCost;
        document.getElementById('malk').innerHTML = malk;
        document.getElementById('malkers').innerHTML = malkers;
    };
    var nextCost = Math.floor(10 * Math.pow(1.1,malkers));
    document.getElementById('malkerCost').innerHTML = malkerCost;

    localStorage.setItem("save",JSON.stringify(saveData)); 
};

window.setInterval(function(){
	
	malkTheMalk(malkers);
	
}, 1000);