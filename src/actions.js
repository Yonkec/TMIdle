/* eslint-disable no-unused-vars */
import { DOMCacheGetOrSet } from "./DOMcache";

export class ActionQueueManager {
    constructor() {
        this.actionQueue = [];
        this.currentActionIndex = 0;
    }

    populateActionCards() {

        fetch('database/actions.json')
            .then(response => response.json())
            .then(actions => {
            for (let action of actions) {
                let card = document.createElement('div');
                card.className = 'actionCard';
                card.draggable = true;
                card.actionObject = action;  

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
        // let startIndex;

        document.addEventListener("dragstart", function(event) {
            dragged = event.target;
            event.target.style.opacity = .5;
            // startIndex = [...dragged.parentNode.children].indexOf(dragged);
        }, false);

        document.addEventListener("dragend", function(event) {
            event.target.style.opacity = "";
        }, false);

        document.querySelector("#playerActionQueue").addEventListener("dragover", (event) => { 
            event.preventDefault();
        }, false);

        document.querySelector("#playerActionQueue").addEventListener("drop", (event) => { 
            event.preventDefault();

            const clonedNode = dragged.cloneNode(true);
            clonedNode.style.opacity = ""; 

            let dropTarget = event.target;
            while(dropTarget.id !== 'playerActionQueue' && !dropTarget.classList.contains('actionCard') && !dropTarget.classList.contains('queuedCard')) {
                dropTarget = dropTarget.parentNode;
            }

            if (dropTarget.id === 'playerActionQueue') {
                const actionToAdd = dragged.actionObject; // Retrieve the linked action object from the custom property
                this.actionQueue.push(actionToAdd);

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

            this.currentActionIndex = 0;

        }, false);
    }


    returnNextAction() {
        if (this.actionQueue.length > 0) {

            const currentAction = this.actionQueue[this.currentActionIndex];

            // Increment the index, looping back to 0 if at the end of the queue
            this.currentActionIndex = (this.currentActionIndex + 1) % this.actionQueue.length;

            return currentAction
        }
    }
}

