(()=>{"use strict";class t{name;constructor(t){this.name=t}enter(){}exit(){}update(){}}function e(t,e){let n=e;return t.health-n<=0&&0==t.isDead?(t.health=0,t.isDead=!0,console.log("You died.")):0==t.isDead&&(t.health-=n,t.monsterImage&&(t.monsterImage.classList.add("shrink"),setTimeout((()=>{t.monsterImage.classList.remove("shrink")}),150))),n}class n extends t{constructor(){super("PlayerTurn")}enter(){super.enter()}exit(){super.exit()}update(t,n){super.update(),e(t,n.baseStats.damage)}}class s extends t{constructor(){super("EnemyTurn")}enter(){super.enter()}exit(){super.exit()}update(t,n){super.update(),e(n,t.baseStats.damage)}}class i extends t{constructor(t,e,s){super("Battle"),this.enemy=t,this.player=e,this.currentTurn=new n,this.battleTimer=0,this.actionQueue=s}enter(){super.enter(),this.currentTurn.enter()}exit(){this.currentTurn.exit(),super.exit(),window.clearInterval(this.battleInterval)}update(t){this.battleTimer+=t,this.battleTimer>=1&&(this.battleTimer=0,super.update(),this.currentTurn.update(this.enemy,this.player,this.actionQueue),this.nextTurn())}isBattleOver(){return this.player.isDead||this.enemy.isDead}resetForNewBattle(t,e){this.enemy=e,this.player=t,this.currentTurn=new n}nextTurn(){this.currentTurn instanceof n?(this.currentTurn.exit(),this.currentTurn=new s,this.currentTurn.enter()):(this.currentTurn.exit(),this.currentTurn=new n,this.currentTurn.enter())}}class a extends t{constructor(){super("Idle")}enter(){super.enter()}exit(){super.exit()}update(){super.update()}}class r extends t{constructor(){super("Death")}enter(){super.enter()}exit(){super.exit()}update(){super.update()}}const o=new Map,c=t=>{const e=o.get(t);if(e)return e;const n=document.getElementById(t);if(!n)throw new TypeError(`Nothing with "${t}" was found.`);return o.set(t,n),n};let d=performance.now();function h(t,e){var n,s,i;for(s=document.getElementsByClassName("tabcontent"),n=0;n<s.length;n++)s[n].style.display="none";for(i=document.getElementsByClassName("tablink"),n=0;n<i.length;n++)i[n].className=i[n].className.replace(" active","");c(e).style.display="block",t.currentTarget.className+=" active"}function l(t,e,n){let s=.36*window.innerWidth*(t.health/t.maxHP);e.style.width=s+"px",t.health<=0?(n&&(n.classList.add("mirrored"),n.classList.add("flashing")),e.style.backgroundColor="red"):t.health<.25*t.maxHP&&(e.style.backgroundColor="orange")}class u{constructor(t){this.player=t,this.items=[]}addItem(t){this.items.push(t)}populateGrid(){const t=c("inventoryGrid");t.innerHTML="",this.items.forEach((e=>{const n=document.createElement("div");n.classList.add("inventory-item-card");const s=document.createElement("h4");if(s.textContent=e.name,n.appendChild(s),e.image){const t=document.createElement("img");t.src=e.image,t.classList.add("inventory-item-image"),n.appendChild(t)}const i=document.createElement("p");i.textContent=e.description,n.appendChild(i);const a=document.createElement("p"),r=Object.entries(e.stats).map((([t,e])=>`${t}: ${e}`));a.textContent=r.join(", "),n.appendChild(a),n.addEventListener("click",(()=>{const t=document.querySelector(".inventory-item-card-selected");t&&t.classList.remove("inventory-item-card-selected"),n.classList.add("inventory-item-card-selected")})),t.appendChild(n)}))}calculateTotalStats(){let t={str:0,sta:0,agi:0,dex:0,wis:0,int:0,cha:0,health:0,damage:0};return this.items.forEach((e=>{Object.keys(e.stats).forEach((n=>{t[n]+=e.stats[n]}))})),t}}window.openTab=h;const p=c("changeState"),m=c("monster"),y=c("player-health-bar"),g=c("enemy-health-bar"),f={battle:()=>new i(C,x,v),idle:()=>new a(C,x,v),death:()=>new r(C,x,v)};let x=new class{constructor(){this.maxHP=100,this.health=100,this.isDead=!1,this.coins=1e3,this.coinGens=0,this.kills=0,this.inventory=new u(this),this.inventoryStats={},this.healthBar=c("player-health-bar"),this.baseStats={str:1,sta:1,agi:1,dex:1,wis:1,int:1,cha:1,health:10,damage:1},this.cachedStats={...this.baseStats},this.modifiers=[]}getStat(t){return this.cachedStats[t]}recalculateCachedStats(t){for(let e of t){this.cachedStats[e]=this.baseStats[e];for(let t of this.modifiers)!t.statsAffected[e]||t.condition&&!t.condition()||(this.cachedStats[e]+=t.statsAffected[e])}}removeCoins(t){return this.coins>=t&&(this.coins-=t,!0)}addCoins(t){this.coins+=t}addItemToInventory(t){this.inventory.addItem(t),this.inventory.populateGrid(),this.inventoryStats=this.inventory.calculateTotalStats(),function(t){const e=c("statsBody");for(;e.firstChild;)e.firstChild.remove();const n=t;for(let[t,s]of Object.entries(n)){const n=document.createElement("tr"),i=document.createElement("td");i.textContent=t,n.appendChild(i);const a=document.createElement("td");a.textContent=s,n.appendChild(a),e.appendChild(n)}}(this.inventoryStats)}},C=new class{constructor(t,e){this.maxHP=0,this.isDead=!1,this.type=t,this.player=e,this.monsterImage=c("monster"),this.healthBar=c("enemy-health-bar"),this.baseStats={str:1,sta:1,agi:1,dex:1,wis:1,int:1,cha:1,health:10,damage:2},this.health=this.calcHP(t,e),c("monster").addEventListener("click",(()=>this.applyDMG(1))),c("resetMob").addEventListener("click",(()=>this.resetMob()))}resetMob(){0!=this.isDead&&this.health<=0&&(this.isDead=!1),this.health=this.calcHP(this.type,this.player),this.monsterImage.classList.remove("mirrored"),this.monsterImage.classList.remove("flashing"),this.healthBar.style.backgroundColor="green"}calcHP(t,e){let n=Math.floor(10*Math.pow(1.02,this.baseStats.health*e.kills));return this.maxHP=n,n}}(50,x);new class{constructor(t){this.items=[],this.player=t;const e=c("buyButton");fetch("database/items.json").then((t=>t.json())).then((t=>{this.items=t,this.populateGrid()})).catch((t=>console.error("Error:",t))),e.addEventListener("click",(()=>{const t=document.querySelector(".shop-item-card-selected"),e=c("shopMessage");if(t){const n=t.getAttribute("data-id"),s=this.buyItem(this.player,n);e.textContent=s}else e.textContent="No item selected."}))}buyItem(t,e){let n=this.items.find((t=>t.id==e));return n?t.removeCoins(n.cost)?(t.addItemToInventory(n),`You bought ${n.name}!`):`You do not have enough coins.  This item costs ${n.cost} and you only have ${t.coins} coins.`:"Item does not exist."}populateGrid(){const t=c("itemsGrid");this.items.forEach((e=>{const n=document.createElement("div");n.classList.add("shop-item-card"),n.setAttribute("data-id",e.id);const s=document.createElement("h4");if(s.textContent=e.name,n.appendChild(s),e.image){const t=document.createElement("img");t.src=e.image,t.classList.add("shop-item-image"),n.appendChild(t)}const i=document.createElement("p");i.textContent="Cost: "+e.cost,n.appendChild(i);const a=document.createElement("p");a.textContent=e.description,n.appendChild(a);const r=document.createElement("p"),o=Object.entries(e.stats).map((([t,e])=>`${t}: ${e}`));r.textContent=o.join(", "),n.appendChild(r),n.addEventListener("click",(()=>{const t=document.querySelector(".shop-item-card-selected");t&&t.classList.remove("shop-item-card-selected"),n.classList.add("shop-item-card-selected")})),t.appendChild(n)}))}addItemToShop(t){this.items.push(t)}}(x);const v=new class{constructor(){this.currentActionIndex=0,this.actionQueue=[]}populateActionCards(){let t;fetch("database/actions.json").then((t=>t.json())).then((t=>{for(let e of t){let t=document.createElement("div");t.className="actionCard",t.draggable=!0,t.dataset.actionObject=JSON.stringify(e);let n=document.createElement("h2");n.textContent=e.title,t.appendChild(n);let s=document.createElement("p");s.textContent=e.description,t.appendChild(s),c("playerActionList").appendChild(t)}})),document.addEventListener("dragstart",(function(e){t=e.target,e.target.style.opacity=.5}),!1),document.addEventListener("dragend",(function(t){t.target.style.opacity=""}),!1),document.querySelector("#playerActionQueue").addEventListener("dragover",(t=>{t.preventDefault()}),!1),document.querySelector("#playerActionQueue").addEventListener("drop",(e=>{e.preventDefault();const n=t.cloneNode(!0);n.style.opacity="";let s=e.target;for(;"playerActionQueue"!==s.id&&!s.classList.contains("actionCard")&&!s.classList.contains("queuedCard");)s=s.parentNode;"playerActionQueue"===s.id?(n.classList.replace("actionCard","queuedCard"),s.appendChild(n)):"playerActionQueue"===t.parentNode.id?(n.classList.replace("actionCard","queuedCard"),s.parentNode.insertBefore(n,s),s.parentNode.insertBefore(s,t)):(n.classList.replace("actionCard","queuedCard"),s.parentNode.insertBefore(n,s.nextSibling)),"playerActionQueue"===t.parentNode.id&&t.parentNode.removeChild(t),this.updateActionQueue(),this.currentActionIndex=0}),!1)}returnNextAction(){if(this.actionQueue.length>0){const t=this.actionQueue[this.currentActionIndex];return this.currentActionIndex=(this.currentActionIndex+1)%this.actionQueue.length,t}}updateActionQueue(){this.actionQueue=Array.from(c("playerActionQueue").children).filter((t=>"DIV"===t.tagName)).map((t=>JSON.parse(t.dataset.actionObject)))}},b=new class{constructor(t={},e){this.empty={update:function(){},enter:function(){},exit:function(){}},this.states=t,this.current=this.empty,this.buttonText=e}change(t,e){if(!this.states[t])throw new Error(`State ${t} does not exist`);this.current.exit(),this.current=this.states[t](),this.current.enter(e),this.buttonText.textContent=this.current.name}update(t){this.current instanceof i&&this.current.isBattleOver()?this.change("death"):this.current.update(t)}nextTurn(){this.current instanceof i&&(this.current.nextTurn(),this.buttonText.textContent=this.current.currentTurn.name)}}(f,p);(t=>{c("tabButtonFight").addEventListener("click",(t=>h(t,"Fight"))),c("tabButtonStrategy").addEventListener("click",(t=>h(t,"Strategy"))),c("tabButtonInventory").addEventListener("click",(t=>h(t,"Inventory"))),c("tabButtonShop").addEventListener("click",(t=>h(t,"Shop"))),c("tabButtonStats").addEventListener("click",(t=>h(t,"Stats"))),c("buyCoinGen").addEventListener("click",(()=>function(t){let e=Math.floor(10*Math.pow(1.1,t.coinGens));t.coins>=e&&(t.coinGens++,t.coins=t.coins-e)}(t))),c("tabButtonFight").click()})(x),v.populateActionCards(),p.addEventListener("click",(()=>{b.change("battle")})),function t(){const e=function(){const t=performance.now(),e=(t-d)/1e3;return d=t,e}();((t,e)=>{c("coins").innerHTML=t.coins,c("coinGens").innerHTML=t.coinGens,c("enemyHP").innerHTML=e.health,c("playerHP").innerHTML=t.health,c("totalKills").innerHTML=t.kills;let n=Math.floor(10*Math.pow(1.1,t.coinGens));c("coinGenCost").innerHTML=n})(x,C),l(C,g,m),l(x,y),b.update(e),requestAnimationFrame(t)}()})();