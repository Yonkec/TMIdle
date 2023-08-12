//need to transition the various generation calculations here

export function buyCoinGen(player){
    let coinGenCost = Math.floor(10 * Math.pow(1.1,player.coinGens));

    if(player.coins >= coinGenCost){
        player.coinGens++;
        player.coins = player.coins - coinGenCost;
    }
}
