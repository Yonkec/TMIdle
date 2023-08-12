export function saveGame(coins, coinGens){
    var saveData = {
        coins: coins,
        coinGens: coinGens
    };

    localStorage.setItem("TMSaveData",JSON.stringify(saveData)); 
}

export function loadGame(){
    var savegame = JSON.parse(localStorage.getItem("TMSaveData")); 
    
    if (typeof savegame.coins != null){
        coins = savegame.coins;
    };

    if (typeof savegame.coinGens != null){
        coinGens = savegame.coinGens;
    };

    return coins, coinGens;
}