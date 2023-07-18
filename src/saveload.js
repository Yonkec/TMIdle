export function saveGame(malk, malkers){
    var saveData = {
        malk: malk,
        malkers: malkers
    };

    localStorage.setItem("TMSaveData",JSON.stringify(saveData)); 
}

export function loadGame(){
    var savegame = JSON.parse(localStorage.getItem("TMSaveData")); 
    
    if (typeof savegame.malk != null){
        malk = savegame.malk;
    };

    if (typeof savegame.malkers != null){
        malkers = savegame.malkers;
    };

    return malk, malkers;
}