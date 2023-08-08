import { DOMCacheGetOrSet } from "./DOMcache";

export function populateActionCards() {
    fetch('database/actions.json')
        .then(response => response.json())
        .then(actions => {
        // For each action in the json, create a new card and add it to the action list
        // Eventually need to enhance this to only pull in actions that are "available" or what not at that moment
        for (let action of actions) {
            let card = document.createElement('div');
            card.className = 'actionCard';
            card.draggable = true;

            let title = document.createElement('h2');
            title.textContent = action.title;
            card.appendChild(title);

            let description = document.createElement('p');
            description.textContent = action.description;
            card.appendChild(description);

            DOMCacheGetOrSet('playerActionList').appendChild(card);
        }
    });

    let dragged;

    document.addEventListener("drag", function(event) {
    }, false);

    document.addEventListener("dragstart", function(event) {
        dragged = event.target;
        event.target.style.opacity = .5;
    }, false);

    document.addEventListener("dragend", function(event) {
        event.target.style.opacity = "";
    }, false);

    document.querySelector("#playerActionQueue").addEventListener("dragover", function(event) {
        event.preventDefault();
    }, false);

    document.querySelector("#playerActionQueue").addEventListener("drop", function(event) {
        event.preventDefault();
        if ( event.target.className == "dropzone" ) {
            event.target.style.background = "";
            dragged.parentNode.removeChild( dragged );
            event.target.appendChild( dragged );
        }  
    }, false);

}
