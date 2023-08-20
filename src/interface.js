import { DOMCacheGetOrSet } from "./DOMcache.js";

export function openTab(evt, tabName) {
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablink");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    DOMCacheGetOrSet(tabName).style.display = "block";
    evt.currentTarget.className += " active";
} 

export function updateHealthBar(entity, healthBar, monsterImage) {
    let screenWidth = window.innerWidth; //get the viewport width
    let maxWidth = screenWidth * 0.3449; //fix this once the UI settles down
    let calculatedWidth = maxWidth * (entity.health / entity.maxHP); //calculate the width based on the health percentage
    healthBar.style.width = calculatedWidth + "px";

    if (entity.health <= 0) {
        if (monsterImage) {
            monsterImage.classList.add("mirrored");
            monsterImage.classList.add("flashing");
        }
        healthBar.style.backgroundColor = "red";
    } else if (entity.health < entity.maxHP * .25) {
        healthBar.style.backgroundColor = "orange";
    }
}

export function updateArmorBar(entity, armorBar) {
    let screenWidth = window.innerWidth;
    let maxWidth = screenWidth * 0.3449; 
    let calculatedWidth = maxWidth * (entity.armor / entity.maxAP); 
    armorBar.style.width = calculatedWidth + "px";
}

export function updateManaBar(entity, manaBar) {
    let screenWidth = window.innerWidth; 
    let maxWidth = screenWidth * 0.3449; 
    let calculatedWidth = maxWidth * (entity.mana / entity.maxMP);
    manaBar.style.width = calculatedWidth + "px";
}

export function updateStatsTable(inventoryStats) {
    const tableBody = DOMCacheGetOrSet('statsBody');
    
    // clear out existing rows
    while (tableBody.firstChild) {
        tableBody.firstChild.remove();
    }
    
    // Add rows for each stat
    const stats = inventoryStats;

    for (let [stat, value] of Object.entries(stats)) {
        const row = document.createElement('tr');
        
        const nameCell = document.createElement('td');
        nameCell.textContent = stat;
        row.appendChild(nameCell);
        
        const valueCell = document.createElement('td');
        valueCell.textContent = value;
        row.appendChild(valueCell);
        
        tableBody.appendChild(row);
    }
}