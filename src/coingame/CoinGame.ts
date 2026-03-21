import { Container, DestroyOptions } from "pixi.js";

export class CoinGame extends Container{
    protected sides = ["sword", "shield"];
    constructor(){
        super();
    }

    public triggerCoinGame(coinSide: string){
        const flippedCoinResult = Math.floor(Math.random() * 2);

        if(this.sides[flippedCoinResult] === coinSide){
            console.log("Win")
        } else{
            console.log("Lose");
        }
    }

    public destroy(){
        
    }
}