export function saveGame(malk, malkers){
    var saveData = {
        malk: malk,
        malkers: malkers
    };

    localStorage.setItem("TMSaveData",JSON.stringify(saveData)); 
}