//need to transition the various generation calculations here

export function buyMalker(){
    let malkerCost = Math.floor(10 * Math.pow(1.1,player.malkers));
    if(player.malk >= malkerCost){
        player.malkers++;
        player.malk = player.malk - malkerCost;
    };
}