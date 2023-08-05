import { DOMCacheGetOrSet } from "./DOMcache.js";

export class Shop {
    constructor(player) {

        this.items = [];
        this.player = player;
        const buyButton = DOMCacheGetOrSet('buyButton');

        fetch('database/items.json')
        .then(response => response.json())
        .then(data => {
            this.items = data;
            this.populateGrid();
        })
        .catch(error => console.error('Error:', error));

        buyButton.addEventListener('click', () => {
            const selectedCard = document.querySelector('.shop-item-card-selected');
            const shopMessage = DOMCacheGetOrSet('shopMessage');
            if (selectedCard) {
                const itemId = selectedCard.getAttribute('data-id');
                const resultMessage = this.buyItem(this.player, itemId);
                shopMessage.textContent = resultMessage;
            } else {
                shopMessage.textContent = 'No item selected.';
            }
        });
    }

    // A method for purchasing items
    buyItem(player, itemId) {
        let item = this.items.find(item => item.id == itemId);
    
        if (!item) {
            return 'Item does not exist.';
        }
    
        if (player.removeMalk(item.cost)) {
            player.addItemToInventory(item);
            return `You bought ${item.name}!`;
        } else {
            return `You do not have enough malk.  This item costs ${item.cost} and you only have ${player.malk} malk.`;
        }
    }
    

    populateGrid() {
        const itemsGrid = DOMCacheGetOrSet('itemsGrid');
    
        this.items.forEach(item => {
            const card = document.createElement('div');
            card.classList.add('shop-item-card');
            card.setAttribute('data-id', item.id);
    
            const nameElement = document.createElement('h4');
            nameElement.textContent = item.name;
            card.appendChild(nameElement);
    
            if (item.image) {
                const imgElement = document.createElement('img');
                imgElement.src = item.image;
                imgElement.classList.add('shop-item-image')
                card.appendChild(imgElement);
            }
    
            const costElement = document.createElement('p');
            costElement.textContent = 'Cost: ' + item.cost;
            card.appendChild(costElement);
    
            const descriptionElement = document.createElement('p');
            descriptionElement.textContent = item.description;
            card.appendChild(descriptionElement);
    
            const statsElement = document.createElement('p');
            const statsStrings = Object.entries(item.stats).map(([stat, value]) => `${stat}: ${value}`);
            statsElement.textContent = statsStrings.join(', ');
            card.appendChild(statsElement);

            card.addEventListener('click', () => {
                const previouslySelectedItem = document.querySelector('.shop-item-card-selected');
                if (previouslySelectedItem) {
                    previouslySelectedItem.classList.remove('shop-item-card-selected');
                }
                card.classList.add('shop-item-card-selected');
            });
    
            itemsGrid.appendChild(card);
        });
    }

    addItemToShop(item) {
        this.items.push(item);
    }
}
