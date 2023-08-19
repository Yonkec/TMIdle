(()=>{"use strict";class t{name;constructor(t){this.name=t}enter(){}exit(){}update(){}}const e={attack:function(t,e,s){n(s,t.damage-s.baseStats.sta/2)},defensive:function(t,e,n){console.log(t,e,n)},heal:function(t,e){let n=t.healAmount;e.health+=n},utility:function(t,e,n){console.log(t,e,n)}};function n(t,e){let n=e;return t.health-n<=0&&0==t.isDead?(t.health=0,t.isDead=!0,console.log("You died.")):0==t.isDead&&(t.health-=n,t.monsterImage&&(t.monsterImage.classList.add("shrink"),setTimeout((()=>{t.monsterImage.classList.remove("shrink")}),150))),n}class s extends t{constructor(){super("PlayerTurn")}enter(){super.enter()}exit(){super.exit()}update(t,n,s){super.update(),s.actionQueue.length>0&&function(t,n,s){const a=e[t.category];a?a(t,n,s):console.error(`Unexpected action category: ${t.category}`)}(s.returnNextAction(),n,t)}}class a extends t{constructor(){super("EnemyTurn")}enter(){super.enter()}exit(){super.exit()}update(t,e){var s;super.update(),n(e,(s=e,t.baseStats.damage-s.baseStats.sta/2))}}class i extends t{constructor(t,e,n){super("Battle"),this.enemy=t,this.player=e,this.currentTurn=new s,this.battleTimer=0,this.actionQueue=n}enter(){super.enter(),this.currentTurn.enter()}exit(){this.currentTurn.exit(),super.exit(),window.clearInterval(this.battleInterval)}update(t){this.battleTimer+=t,this.battleTimer>=1&&(this.battleTimer=0,super.update(),this.currentTurn.update(this.enemy,this.player,this.actionQueue),this.nextTurn())}isBattleOver(){return this.player.isDead||this.enemy.isDead}resetForNewBattle(t,e){this.enemy=e,this.player=t,this.currentTurn=new s}nextTurn(){this.currentTurn instanceof s?(this.currentTurn.exit(),this.currentTurn=new a,this.currentTurn.enter()):(this.currentTurn.exit(),this.currentTurn=new s,this.currentTurn.enter())}}class r extends t{constructor(){super("Idle")}enter(){super.enter()}exit(){super.exit()}update(){super.update()}}class o extends t{constructor(){super("Death")}enter(){super.enter()}exit(){super.exit()}update(){super.update()}}const c=new Map,d=t=>{const e=c.get(t);if(e)return e;const n=document.getElementById(t);if(!n)throw new TypeError(`Nothing with "${t}" was found.`);return c.set(t,n),n};let l=performance.now();async function u(t){try{const e=await fetch(t);return await e.json()}catch(t){console.error("Error loading JSON file:",t)}}function h(t,e){var n,s,a;for(s=document.getElementsByClassName("tabcontent"),n=0;n<s.length;n++)s[n].style.display="none";for(a=document.getElementsByClassName("tablink"),n=0;n<a.length;n++)a[n].className=a[n].className.replace(" active","");d(e).style.display="block",t.currentTarget.className+=" active"}function p(t,e,n){let s=.36*window.innerWidth*(t.health/t.maxHP);e.style.width=s+"px",t.health<=0?(n&&(n.classList.add("mirrored"),n.classList.add("flashing")),e.style.backgroundColor="red"):t.health<.25*t.maxHP&&(e.style.backgroundColor="orange")}class m{constructor(t){this.player=t,this.items=[]}addItem(t){this.items.push(t)}populateGrid(){const t=d("inventoryGrid");t.innerHTML="",this.items.forEach((e=>{const n=document.createElement("div");n.classList.add("inventory-item-card");const s=document.createElement("h4");if(s.textContent=e.name,n.appendChild(s),e.image){const t=document.createElement("img");t.src=e.image,t.classList.add("inventory-item-image"),n.appendChild(t)}const a=document.createElement("p");a.textContent=e.description,n.appendChild(a);const i=document.createElement("p"),r=Object.entries(e.stats).map((([t,e])=>`${t}: ${e}`));i.textContent=r.join(", "),n.appendChild(i),n.addEventListener("click",(()=>{const t=document.querySelector(".inventory-item-card-selected");t&&t.classList.remove("inventory-item-card-selected"),n.classList.add("inventory-item-card-selected")})),t.appendChild(n)}))}calculateTotalStats(){let t={str:0,sta:0,agi:0,dex:0,wis:0,int:0,cha:0,health:0,damage:0};return this.items.forEach((e=>{Object.keys(e.stats).forEach((n=>{t[n]+=e.stats[n]}))})),t}}window.openTab=h;const y=d("changeState"),f=d("monster"),g=d("player-health-bar"),v=d("enemy-health-bar"),C={battle:()=>new i(b,x,L),idle:()=>new r(b,x,L),death:()=>new o(b,x,L)};let x=new class{constructor(){this.maxHP=100,this.health=100,this.isDead=!1,this.coins=1e3,this.coinGens=0,this.kills=0,this.inventory=new m(this),this.inventoryStats={},this.healthBar=d("player-health-bar"),u("database/player.json").then((t=>{this.baseStats=t,this.cachedStats={...this.baseStats}})),this.modifiers=[]}getStat(t){return this.cachedStats[t]}recalculateCachedStats(t){for(let e of t){this.cachedStats[e]=this.baseStats[e];for(let t of this.modifiers)!t.statsAffected[e]||t.condition&&!t.condition()||(this.cachedStats[e]+=t.statsAffected[e])}}removeCoins(t){return this.coins>=t&&(this.coins-=t,!0)}addCoins(t){this.coins+=t}addItemToInventory(t){this.inventory.addItem(t),this.inventory.populateGrid(),this.inventoryStats=this.inventory.calculateTotalStats(),function(t){const e=d("statsBody");for(;e.firstChild;)e.firstChild.remove();const n=t;for(let[t,s]of Object.entries(n)){const n=document.createElement("tr"),a=document.createElement("td");a.textContent=t,n.appendChild(a);const i=document.createElement("td");i.textContent=s,n.appendChild(i),e.appendChild(n)}}(this.inventoryStats)}},b=new class{constructor(t,e){this.maxHP=0,this.isDead=!1,this.type=t,this.player=e,this.monsterImage=d("monster"),this.healthBar=d("enemy-health-bar"),this.baseStats=[],u("database/goblinbrawler.json").then((n=>{this.baseStats=n,this.health=this.calcHP(t,e)})),d("monster").addEventListener("click",(()=>n(this,1))),d("resetMob").addEventListener("click",(()=>this.resetMob()))}resetMob(){0!=this.isDead&&this.health<=0&&(this.isDead=!1),this.health=this.calcHP(this.type,this.player),this.monsterImage.classList.remove("mirrored"),this.monsterImage.classList.remove("flashing"),this.healthBar.style.backgroundColor="green"}calcHP(t,e){let n=Math.ceil(10*Math.pow(1.02,this.baseStats.health*e.kills));return this.maxHP=n,n}}(50,x);new class{constructor(t){this.items=[],this.player=t;const e=d("buyButton");fetch("database/items.json").then((t=>t.json())).then((t=>{this.items=t,this.populateGrid()})).catch((t=>console.error("Error:",t))),e.addEventListener("click",(()=>{const t=document.querySelector(".shop-item-card-selected"),e=d("shopMessage");if(t){const n=t.getAttribute("data-id"),s=this.buyItem(this.player,n);e.textContent=s}else e.textContent="No item selected."}))}buyItem(t,e){let n=this.items.find((t=>t.id==e));return n?t.removeCoins(n.cost)?(t.addItemToInventory(n),`You bought ${n.name}!`):`You do not have enough coins.  This item costs ${n.cost} and you only have ${t.coins} coins.`:"Item does not exist."}populateGrid(){const t=d("itemsGrid");this.items.forEach((e=>{const n=document.createElement("div");n.classList.add("shop-item-card"),n.setAttribute("data-id",e.id);const s=document.createElement("h4");if(s.textContent=e.name,n.appendChild(s),e.image){const t=document.createElement("img");t.src=e.image,t.classList.add("shop-item-image"),n.appendChild(t)}const a=document.createElement("p");a.textContent="Cost: "+e.cost,n.appendChild(a);const i=document.createElement("p");i.textContent=e.description,n.appendChild(i);const r=document.createElement("p"),o=Object.entries(e.stats).map((([t,e])=>`${t}: ${e}`));r.textContent=o.join(", "),n.appendChild(r),n.addEventListener("click",(()=>{const t=document.querySelector(".shop-item-card-selected");t&&t.classList.remove("shop-item-card-selected"),n.classList.add("shop-item-card-selected")})),t.appendChild(n)}))}addItemToShop(t){this.items.push(t)}}(x);const L=new class{constructor(){this.currentActionIndex=0,this.actionQueue=[]}populateActionCards(){let t;fetch("database/actions.json").then((t=>t.json())).then((t=>{for(let e in t)for(let n of t[e]){let t=document.createElement("div");t.className="actionCard",t.draggable=!0,n.category=e,t.dataset.actionObject=JSON.stringify(n);let s=document.createElement("h2");s.textContent=n.title,t.appendChild(s);let a=document.createElement("div");a.className="popup",t.appendChild(a);let i=document.createElement("p");i.className="description",i.textContent=n.description,a.appendChild(i);let r=document.createElement("p");r.className="category",r.textContent="[ "+e.charAt(0).toUpperCase()+e.slice(1)+" ]",a.appendChild(r),d("playerActionList").appendChild(t)}})),document.addEventListener("dragstart",(function(e){t=e.target,t.style.opacity=.5;const n=t.querySelector(".popup");n&&(n.style.display="none")}),!1),document.addEventListener("dragend",(function(t){t.target.style.opacity="";const e=t.target.querySelector(".popup");e&&(e.style.display="none")}),!1),document.querySelector("#playerActionList").addEventListener("dragover",(t=>{t.preventDefault()}),!1),document.querySelector("#playerActionList").addEventListener("drop",(e=>{"playerActionQueue"!==t.parentNode.id&&"playerActionList"!==t.parentNode.id||(e.preventDefault(),t.cloneNode(!0).style.opacity="","playerActionList"===e.target.id&&"playerActionQueue"===t.parentNode.id&&t.parentNode.removeChild(t))}),!1),document.querySelector("#playerActionQueue").addEventListener("dragover",(t=>{t.preventDefault()}),!1),document.querySelector("#playerActionQueue").addEventListener("drop",(e=>{if("playerActionQueue"===t.parentNode.id||"playerActionList"===t.parentNode.id){e.preventDefault();const n=e.target.querySelector(".popup");n&&(n.style.display="none");const s=t.cloneNode(!0);s.style.opacity="";let a=e.target;for(;"playerActionQueue"!==a.id&&!a.classList.contains("actionCard")&&!a.classList.contains("queuedCard");)a=a.parentNode;"playerActionQueue"===a.id?(s.classList.replace("actionCard","queuedCard"),a.appendChild(s)):"playerActionQueue"===t.parentNode.id?(s.classList.replace("actionCard","queuedCard"),a.parentNode.insertBefore(s,a),a.parentNode.insertBefore(a,t)):(s.classList.replace("actionCard","queuedCard"),a.parentNode.insertBefore(s,a.nextSibling)),"playerActionQueue"===t.parentNode.id&&t.parentNode.removeChild(t),this.updateActionQueue(),this.currentActionIndex=0}}),!1),document.addEventListener("mouseover",(function(t){const e=t.target.closest(".actionCard");e&&(e.querySelector(".popup").style.display="")}),!1),document.addEventListener("mouseout",(function(t){const e=t.target.closest(".actionCard");e&&!e.classList.contains("hovered")&&(e.querySelector(".popup").style.display="none")}),!1)}returnNextAction(){if(this.actionQueue.length>0){const t=this.actionQueue[this.currentActionIndex];return this.currentActionIndex=(this.currentActionIndex+1)%this.actionQueue.length,console.log({currentAction:t}),t}}updateActionQueue(){this.actionQueue=Array.from(d("playerActionQueue").children).filter((t=>"DIV"===t.tagName)).map((t=>JSON.parse(t.dataset.actionObject))),console.log(this.actionQueue)}},E=new class{constructor(t={},e){this.empty={update:function(){},enter:function(){},exit:function(){}},this.states=t,this.current=this.empty,this.buttonText=e}change(t,e){if(!this.states[t])throw new Error(`State ${t} does not exist`);this.current.exit(),this.current=this.states[t](),this.current.enter(e),this.buttonText.textContent=this.current.name}update(t){this.current instanceof i&&this.current.isBattleOver()?this.change("death"):this.current.update(t)}nextTurn(){this.current instanceof i&&(this.current.nextTurn(),this.buttonText.textContent=this.current.currentTurn.name)}}(C,y);(t=>{d("tabButtonFight").addEventListener("click",(t=>h(t,"Fight"))),d("tabButtonStrategy").addEventListener("click",(t=>h(t,"Strategy"))),d("tabButtonInventory").addEventListener("click",(t=>h(t,"Inventory"))),d("tabButtonShop").addEventListener("click",(t=>h(t,"Shop"))),d("tabButtonStats").addEventListener("click",(t=>h(t,"Stats"))),d("buyCoinGen").addEventListener("click",(()=>function(t){let e=Math.floor(10*Math.pow(1.1,t.coinGens));t.coins>=e&&(t.coinGens++,t.coins=t.coins-e)}(t))),d("tabButtonFight").click()})(x),L.populateActionCards(),y.addEventListener("click",(()=>{E.change("battle")})),function t(){const e=function(){const t=performance.now(),e=(t-l)/1e3;return l=t,e}();((t,e)=>{d("coins").innerHTML=t.coins,d("coinGens").innerHTML=t.coinGens,d("enemyHP").innerHTML=e.health,d("playerHP").innerHTML=t.health,d("totalKills").innerHTML=t.kills;let n=Math.floor(10*Math.pow(1.1,t.coinGens));d("coinGenCost").innerHTML=n})(x,b),p(b,v,f),p(x,g),E.update(e),requestAnimationFrame(t)}()})();