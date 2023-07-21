import { DOMCacheGetOrSet } from "./DOMcache.js";

export const populateDOMCache = () => {

    //UI Navigation Events
    DOMCacheGetOrSet('tabButtonFight').addEventListener("click", (event) => openTab(event, 'Fight'));
    DOMCacheGetOrSet('tabButtonUpgrades').addEventListener("click", (event) => openTab(event, 'Upgrades'));
    DOMCacheGetOrSet('tabButtonInventory').addEventListener("click", (event) => openTab(event, 'Inventory'));
    DOMCacheGetOrSet('tabButtonShop').addEventListener("click", (event) => openTab(event, 'Shop'));

    //Generator purchase Events
    

}