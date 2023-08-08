import { DOMCacheGetOrSet } from "./DOMcache.js";
import { openTab } from "./interface.js";

export const populateDOMCache = () => {

    //UI Navigation Events
    DOMCacheGetOrSet('tabButtonFight').addEventListener("click", (event) => openTab(event, 'Fight'));
    DOMCacheGetOrSet('tabButtonStrategy').addEventListener("click", (event) => openTab(event, 'Strategy'));
    DOMCacheGetOrSet('tabButtonInventory').addEventListener("click", (event) => openTab(event, 'Inventory'));
    DOMCacheGetOrSet('tabButtonShop').addEventListener("click", (event) => openTab(event, 'Shop'));
    DOMCacheGetOrSet('tabButtonStats').addEventListener("click", (event) => openTab(event, 'Stats'));

    //Generator purchase Events
    

}