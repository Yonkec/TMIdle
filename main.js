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
    
    if (typeof savegame.malk !== "undefined"){
        malk = savegame.malk;
    }

    if (typeof savegame.malkers !== "undefined"){
        malkers = savegame.malkers;
    }
}

function buyMalker(){
    var malkerCost = Math.floor(10 * Math.pow(1.1,malkers));
    if(malk >= malkerCost){
        malkers = malkers + 1;
    	malk = malk - malkerCost;
        document.getElementById('malk').innerHTML = malk;
        document.getElementById('malkers').innerHTML = malkers;
    };
    var nextCost = Math.floor(10 * Math.pow(1.1,malkers));
    document.getElementById('malkerCost').innerHTML = nextCost;

    localStorage.setItem("saveData",JSON.stringify(saveData)); 
};

window.setInterval(function(){
	
	malkTheMalk(malkers);
	
}, 1000);