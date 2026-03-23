import { Container, DestroyOptions } from "pixi.js";
import { GameUtils } from "../common/GameUtils";

export class CoinGame extends Container{
    protected sides = ["sword", "shield"];
    constructor(){
        super();
    }

    public triggerCoinGame(coinSide: string){
        GameUtils.isCoinGameTriggered = true;
        
        let flippedCoinResult = Math.floor(Math.random() * 2);

        if(this.isGameWon(this.sides[flippedCoinResult], coinSide)){
            // console.log("won");
            GameUtils.isCoinGameWon = true;
        }
    }

    protected isGameWon(result: string, coinSide: string): boolean{
        return result === coinSide ? true : false;
    }

    public destroy(){
        
    }
}