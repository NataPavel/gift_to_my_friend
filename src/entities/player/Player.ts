import { Assets, Container, Graphics, Sprite } from "pixi.js";
import { GameUtils } from "../../common/GameUtils";
import { entityParameterType } from "../types/EntityParametersType";

export class Player extends Container {
    protected playerSpeed: number = 8;
    protected playerTexture: any;
    protected playerSizeWidth!: number;
    protected playerSizeHeight!: number;

    protected leftKey: Array<string> = ["ArrowLeft", "KeyA"];
    protected rightKey: Array<string> = ["ArrowRight", "KeyD"];
    protected downKey: Array<string> = ["ArrowDown", "KeyS"];
    protected upKey: Array<string> = ["ArrowUp", "KeyW"];

    protected isLeftKeyPressed: boolean = false;
    protected isRightKeyPressed: boolean = false;
    protected isDownKeyPressed: boolean = false;
    protected isUpKeyPressed: boolean = false;

    protected testPlayer: any;
    protected texture: any;

    constructor(playerTexture: any) {
        super();

        this.playerTexture = playerTexture;

        this.init();

        window.addEventListener('keydown', this.onKeyDown.bind(this));
        window.addEventListener('keyup', this.onKeyUp.bind(this));
    }

    protected init() {
        this.playerSizeWidth = GameUtils.playerSizeWidth;
        this.playerSizeHeight = GameUtils.playerSizeHeight;

        // this.testPlayer = new Graphics()
        //     .rect(0, 0, this.playerSizeWidth, this.playerSizeHeight)
        //     .fill("09637e");
        this.texture = Assets.get("player_up");

        if (this.texture) {
            this.testPlayer = new Sprite(this.texture);
            this.testPlayer.scale.set(0.4);
            this.testPlayer.anchor.set(0.5);

            this.addChild(this.testPlayer);
            console.log("BG added successfully");
        } else {
            console.error(`Texture 'player' not found! Check if loadAssets finished.`);
        }
    }

    protected onKeyDown(event: any) {
        this.handleKey(event, true);
    }

    protected onKeyUp(event: any) {
        this.handleKey(event, false);
    }

    protected handleKey(event: any, isPressed: boolean) {
        if (!event.code) {
            return;
        }

        if (this.leftKey.includes(event.code)) {
            this.isLeftKeyPressed = isPressed;
        } else if (this.rightKey.includes(event.code)) {
            this.isRightKeyPressed = isPressed;
        } else if (this.downKey.includes(event.code)) {
            this.isDownKeyPressed = isPressed;
        } else if (this.upKey.includes(event.code)) {
            this.isUpKeyPressed = isPressed;
        }
    }

    public update() {
        if (this.isLeftKeyPressed) {
            this.testPlayer.texture = Assets.get("player_left");
            let nextX = this.x - this.playerSpeed;

            if (nextX >= 0 && this.canPlayerMoveByX(nextX)) {
                this.x = nextX;
            }
        }
        if (this.isRightKeyPressed) {
            this.testPlayer.texture = Assets.get("player_right");
            let nextX = this.x + this.playerSpeed;

            if (nextX <= GameUtils.appWidth - this.playerSizeWidth
                && this.canPlayerMoveByX(nextX)) {
                this.x = nextX;
            }
        }
        if (this.isUpKeyPressed) {
            this.testPlayer.texture = Assets.get("player_up");
            let nextY = this.y - this.playerSpeed;

            if (nextY >= 0 && this.canPlayerMoveByY(nextY)) {
                this.y = nextY;
            }
        }
        if (this.isDownKeyPressed) {
            this.testPlayer.texture = Assets.get("player_down");
            let nextY = this.y + this.playerSpeed;

            if (nextY <= GameUtils.appHeight - this.playerSizeHeight
                && this.canPlayerMoveByY(nextY)) {
                this.y = nextY;
            }
        }
    }

    public getPlayerParameters(): entityParameterType {
        return {
            x: this.x,
            y: this.y,
            width: this.playerSizeWidth,
            height: this.playerSizeHeight
        };
    }

    // canPlayerMoveByX and canPlayerMoveByY checks, 
    // if player will collide with the object by certain coordinate axis
    protected canPlayerMoveByX(nextX: number): boolean {
        let collibleObjectsList = GameUtils.collibleObjectsList;
        for (let obj of collibleObjectsList) {
            if (GameUtils.willCollide(
                obj,
                nextX,
                this.y,
                this.playerSizeWidth,
                this.playerSizeHeight
            )) {
                return false; 
            }
        }
        return true;
    }

    protected canPlayerMoveByY(nextY: number): boolean {
        let collibleObjectsList = GameUtils.collibleObjectsList;
        for (let obj of collibleObjectsList) {
            if (GameUtils.willCollide(
                obj,
                this.x,
                nextY,
                this.playerSizeWidth,
                this.playerSizeHeight
            )) {
                return false; 
            }
        }
        return true;
}

    public destroy() { }
}