import { entityParameterType } from "../entities/types/EntityParametersType";

/*
    Class which contains variables 
    that every class can use
*/
export class GameUtils{
    public static appWidth: number;
    public static appHeight: number;

    public static playerSizeHeight: number;
    public static playerSizeWidth: number;

    public static interactionRadius: number = 10;
    public static isPlayerCollideWithSmth: boolean = false;

    public static collibleObjectsList: Array<entityParameterType> = [];
    public static isCoinGameWon: boolean = false;
    public static isCoinGameTriggered: boolean = false;
    public static isSlotTriggered: boolean = false;

    // where obj - is anything besides player
    public static isInteraction(obj: entityParameterType, player: entityParameterType): boolean{
        return (
            obj.x < player.x + player.width + 15 &&
            obj.x + obj.width + 15 > player.x &&
            obj.y < player.y + player.height + 15 &&
            obj.y + obj.height + 15 > player.y
        );
    }

    public static willCollide(
        obj: entityParameterType,
        playerNextX: number, 
        playerNextY: number,
        playerWidth: number,
        playerHeight: number
    ): boolean{
        return (
            obj.x < playerNextX + playerWidth &&
            obj.x + obj.width > playerNextX &&
            obj.y < playerNextY + playerHeight &&
            obj.y + obj.height > playerNextY
        );
    }
}