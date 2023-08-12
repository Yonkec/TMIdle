import { DOMCacheGetOrSet } from "./DOMcache.js";
import { openTab } from "./interface.js";
import { buyMalker } from "./generators.js";

export const populateDOMEventCache = (player) => {

    //UI Navigation Events
    DOMCacheGetOrSet('tabButtonFight').addEventListener("click", (event) => openTab(event, 'Fight'));
    DOMCacheGetOrSet('tabButtonStrategy').addEventListener("click", (event) => openTab(event, 'Strategy'));
    DOMCacheGetOrSet('tabButtonInventory').addEventListener("click", (event) => openTab(event, 'Inventory'));
    DOMCacheGetOrSet('tabButtonShop').addEventListener("click", (event) => openTab(event, 'Shop'));
    DOMCacheGetOrSet('tabButtonStats').addEventListener("click", (event) => openTab(event, 'Stats'));

    //Generator purchase Events
    DOMCacheGetOrSet('buyMalker').addEventListener('click', () => buyMalker(player));
    DOMCacheGetOrSet('tabButtonFight').click();
    

}

export const updateAllOfTheThings = (player, mob) => {
    //why am I not using react or vue
    DOMCacheGetOrSet('malk').innerHTML = player.malk;
    DOMCacheGetOrSet('malkers').innerHTML = player.malkers;
    DOMCacheGetOrSet('enemyHP').innerHTML = mob.health;
    DOMCacheGetOrSet('totalKills').innerHTML = player.kills;

    let nextCost = Math.floor(10 * Math.pow(1.1,player.malkers));
    DOMCacheGetOrSet('malkerCost').innerHTML = nextCost;
}