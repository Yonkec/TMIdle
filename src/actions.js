/* eslint-disable no-unused-vars */
import { DOMCacheGetOrSet } from "./DOMcache";

export class ActionQueueManager {
    constructor() {
        this.currentActionIndex = 0;
        this.actionQueue = [];
    }

    populateActionCards() {

        // iterates over actions.json and generates action cards for selection by the player
        fetch('database/actions.json')
            .then(response => response.json())
            .then(abilityCategories => {
                for (let category in abilityCategories) {
                    for (let ability of abilityCategories[category]) {
                        let card = document.createElement('div');
                        card.className = 'actionCard';
                        card.draggable = true;

                        //ensure we carry forward the category within our new actionCard objects
                        ability.category = category;
                        
                        card.dataset.actionObject = JSON.stringify(ability);
    
                        let title = document.createElement('h2');
                        title.textContent = ability.title;
                        card.appendChild(title);
    
                        let popup = document.createElement('div');
                        popup.className = 'popup';
                        card.appendChild(popup);
    
                        let description = document.createElement('p');
                        description.className = 'description';
                        description.textContent = ability.description;
                        popup.appendChild(description);
    
                        let categoryElem = document.createElement('p');
                        categoryElem.className = 'category';
                        categoryElem.textContent = "[ " + category.charAt(0).toUpperCase() + category.slice(1) + " ]";
                        popup.appendChild(categoryElem);
    
                        DOMCacheGetOrSet('playerActionList').appendChild(card);
                    }
                }
            });    

        let dragged;

        //influences the state of the card while being dragged to improve UX
        document.addEventListener("dragstart", function(event) {
            dragged = event.target;
            dragged.style.opacity = .5;
            const popup = dragged.querySelector(".popup");

            if (popup) {
                popup.style.display = 'none';
            }
        }, false);

        //resets specific values once dragging has ended to return to normal state
        document.addEventListener("dragend", function(event) {
            event.target.style.opacity = "";
            const popup = event.target.querySelector(".popup");

            if (popup) {
                popup.style.display = 'none';
            }
        }, false);

        //attaches a dragover event listener to the HTML element with the ID 'playerActionList'.
        document.querySelector("#playerActionList").addEventListener("dragover", (event) => {
            //prevent the default behavior of the 'dragover' event, which is to not allow dropping.
            event.preventDefault();
        }, false);

        //allows us to delete unwanted queued cards by dragging them back to the actionlist
        document.querySelector("#playerActionList").addEventListener("drop", (event) => {

            //blocks all unrelated drag events and allows them to fall to event.default
            if (dragged.parentNode.id === 'playerActionQueue' || dragged.parentNode.id === 'playerActionList') {

                event.preventDefault();

                const clonedNode = dragged.cloneNode(true);
                clonedNode.style.opacity = "";

                let dropTarget = event.target;

                if (dropTarget.id === 'playerActionList' && dragged.parentNode.id === 'playerActionQueue') {
                    dragged.parentNode.removeChild(dragged);
                }
            }
        }, false);

        document.querySelector("#playerActionQueue").addEventListener("dragover", (event) => {
                event.preventDefault();
        }, false);

        //handles all of the functionality for dragging a card from the actionlist to the actionqueue
        document.querySelector("#playerActionQueue").addEventListener("drop", (event) => {

            if (dragged.parentNode.id === 'playerActionQueue' || dragged.parentNode.id === 'playerActionList') {
                event.preventDefault();

                const popup = event.target.querySelector(".popup");

                if (popup) {
                    popup.style.display = 'none';
                }

                const clonedNode = dragged.cloneNode(true);
                clonedNode.style.opacity = "";

                let dropTarget = event.target;

                //traverses the DOM heirarchy until we find one of the relevant classes or IDs to proceed
                while (dropTarget.id !== 'playerActionQueue' && !dropTarget.classList.contains('actionCard') && !dropTarget.classList.contains('queuedCard')) {
                    dropTarget = dropTarget.parentNode;
                }
                //update DOM based on specifics of the card being dropped
                if (dropTarget.id === 'playerActionQueue') {
                    clonedNode.classList.replace('actionCard', 'queuedCard');
                    dropTarget.appendChild(clonedNode);
                } else {
                    if (dragged.parentNode.id === 'playerActionQueue') {
                        clonedNode.classList.replace('actionCard', 'queuedCard');
                        dropTarget.parentNode.insertBefore(clonedNode, dropTarget);
                        dropTarget.parentNode.insertBefore(dropTarget, dragged);
                    } else {
                        clonedNode.classList.replace('actionCard', 'queuedCard');
                        dropTarget.parentNode.insertBefore(clonedNode, dropTarget.nextSibling);
                    }
                }

                if (dragged.parentNode.id === 'playerActionQueue') {
                    dragged.parentNode.removeChild(dragged);
                }

                this.updateActionQueue();
                this.currentActionIndex = 0;
            }
        }, false);

        //show the popup when moving away from an action card
        document.addEventListener("mouseover", function(event) {
            const card = event.target.closest('.actionCard');
        
            if (card) {
                const popup = card.querySelector(".popup");
                popup.style.display = '';
            }
        }, false);
        //hides the popup when moving away from an action card
        document.addEventListener("mouseout", function(event) {
            const card = event.target.closest('.actionCard');
        
            if (card && !card.classList.contains('hovered')) {
                const popup = card.querySelector(".popup");
                popup.style.display = 'none';
            }
        }, false);
    }

    //provides the next action within our queue, iterating continually over the available cards
    //this action object is consumed to obtain the necessary information as to what the player does for that turn
    returnNextAction() {
        if (this.actionQueue.length > 0) {
            const currentAction = this.actionQueue[this.currentActionIndex];
            this.currentActionIndex = (this.currentActionIndex + 1) % this.actionQueue.length;
            console.log({currentAction});
            return currentAction;
        }
    }
    //references the DOM to provide the current list of queued actions
    updateActionQueue() {
        this.actionQueue = Array.from(DOMCacheGetOrSet('playerActionQueue').children)
            .filter(child => child.tagName === 'DIV')
            .map(child => JSON.parse(child.dataset.actionObject));
        console.log(this.actionQueue);
    }    
}