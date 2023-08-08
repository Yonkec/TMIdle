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
    let screenWidth = window.innerWidth; // Get the viewport width
    let maxWidth = screenWidth * 0.36; // Set the maximum width to 50% of the screen width
    let calculatedWidth = maxWidth * (entity.health / entity.maxHP); // Calculate the width based on the health percentage
    healthBar.style.width = calculatedWidth + "px"; // Set the width in pixels

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