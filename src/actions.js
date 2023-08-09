/* eslint-disable no-unused-vars */
import { DOMCacheGetOrSet } from "./DOMcache";

export function populateActionCards() {
    fetch('database/actions.json')
        .then(response => response.json())
        .then(actions => {
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
    let startIndex;

    document.addEventListener("dragstart", function(event) {
        dragged = event.target;
        event.target.style.opacity = .5;
        startIndex = [...dragged.parentNode.children].indexOf(dragged);
    }, false);

    document.addEventListener("dragend", function(event) {
        event.target.style.opacity = "";
    }, false);

    document.querySelector("#playerActionQueue").addEventListener("dragover", function(event) {
        event.preventDefault();
    }, false);

    document.querySelector("#playerActionQueue").addEventListener("drop", function(event) {
        event.preventDefault();

        const clonedNode = dragged.cloneNode(true);
        clonedNode.style.opacity = ""; 

        let dropTarget = event.target;
        while(dropTarget.id !== 'playerActionQueue' && !dropTarget.classList.contains('actionCard') && !dropTarget.classList.contains('queuedCard')) {
            dropTarget = dropTarget.parentNode;
        }

        if (dropTarget.id === 'playerActionQueue') {
            clonedNode.dataset.sequence = dropTarget.children.length + 1;
            clonedNode.classList.replace('actionCard', 'queuedCard'); 
            dropTarget.appendChild(clonedNode);
        } else {

            if(dragged.parentNode.id === 'playerActionQueue') {
                const dragSequence = clonedNode.dataset.sequence;
                const dropSequence = dropTarget.dataset.sequence;

                clonedNode.dataset.sequence = dropSequence;
                dropTarget.dataset.sequence = dragSequence;

                // Swap visual positions
                dropTarget.parentNode.insertBefore(clonedNode, dropTarget);
                dropTarget.parentNode.insertBefore(dropTarget, dragged);
            } else {
                clonedNode.classList.replace('actionCard', 'queuedCard'); 
                clonedNode.dataset.sequence = dropTarget.parentNode.children.length + 1; 
                dropTarget.parentNode.insertBefore(clonedNode, dropTarget.nextSibling);
            }
        }

        if(dragged.parentNode.id === 'playerActionQueue') {
            dragged.parentNode.removeChild(dragged);
        }

    }, false);

}
