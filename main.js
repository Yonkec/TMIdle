var cookies = 0;

function cookieClick(number){
    cookies = cookies + number;
    document.getElementById("cookies").innerHTML = cookies;
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

var malkers = 0;

function buyCursor(){
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
	
	cookieClick(malkers);
	
}, 1000);