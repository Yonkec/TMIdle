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

            let sequence = document.createElement('div');
            sequence.className = 'sequence';
            card.appendChild(sequence);

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
            dropTarget.appendChild(clonedNode);
            clonedNode.classList.replace('actionCard', 'queuedCard'); 
            clonedNode.querySelector('.sequence').textContent = dropTarget.children.length;
        } else {

            if(dragged.parentNode.id === 'playerActionQueue') {
                const dragSequence = clonedNode.querySelector('.sequence');
                const dropSequence = dropTarget.querySelector('.sequence');
                
                const tempSeq = dragSequence.textContent;
                dragSequence.textContent = dropSequence.textContent;
                dropSequence.textContent = tempSeq;
    
                // insert based on startIndex if from 'playerActionQueue'
                dropTarget.parentNode.insertBefore(clonedNode, dropTarget.parentNode.children[startIndex]);
            } else {
                clonedNode.classList.replace('actionCard', 'queuedCard'); 
                dropTarget.parentNode.insertBefore(clonedNode, dropTarget.nextSibling);
                clonedNode.querySelector('.sequence').textContent = dropTarget.parentNode.children.length;
            }
        }
    
        if(dragged.parentNode.id === 'playerActionQueue') {
            dragged.parentNode.removeChild(dragged);
        }
    
    }, false);
    
}
