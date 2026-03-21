import { Container, EventEmitter, Graphics, Text } from "pixi.js";
import { GameUtils } from "../common/GameUtils";
import { BartenderNPC } from "../entities/npc/BartenderNPC";
import { BaseScene } from "./BaseScene";

export class TavernScene extends BaseScene {
    protected testNPC!: BartenderNPC;

    constructor(playerTexture: any, backgroundTexture: any) {
        super(playerTexture, backgroundTexture);
    }

    protected init() {
        super.init();

        this.setPlayerPosition();
        this.initNPCs();
    }

    protected initNPCs() {
        this.testNPC = new BartenderNPC("Rayan Gosling", "none");

        this.testNPC.x = GameUtils.appWidth / 2;
        this.testNPC.y = this.testNPC.height + 10;
        this.addChild(this.testNPC);

        GameUtils.collibleObjectsList.push(this.testNPC.getNPCParameters());
    }

    protected setPlayerPosition() {
        this._playerPositionX = GameUtils.appWidth / 2;
        this._playerPositionY = GameUtils.appHeight - GameUtils.playerSizeHeight;

        this._player.x = this._playerPositionX;
        this._player.y = this._playerPositionY;
    }

    public update(): void {
        super.update();
        if (GameUtils.isInteraction(this.testNPC.getNPCParameters(), this._player.getPlayerParameters())) {
            this.testNPC.showInteractionKey();
        } else {
            this.testNPC.hideInteractionKey();
            this.testNPC.destroySpeechText();
        }
    }
}