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

    document.getElementById('malk').innerHTML = malk;
    document.getElementById('malkers').innerHTML = malkers;

    var nextCost = Math.floor(10 * Math.pow(1.1,malkers));
    document.getElementById('malkerCost').innerHTML = nextCost;
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

};

window.setInterval(function(){
	
	malkTheMalk(malkers);
    saveGame();
	
}, 1000);