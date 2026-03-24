import { Container, EventEmitter, Graphics, Text } from "pixi.js";
import { GameUtils } from "../common/GameUtils";
import { BartenderNPC } from "../entities/npc/BartenderNPC";
import { BaseScene } from "./BaseScene";
import { SlotMachineEntity } from "../entities/npc/slotmachine/SlotMachineEntity";

export class TavernScene extends BaseScene {
    protected bartenderNPC!: BartenderNPC;
    protected slotMachine!: SlotMachineEntity;

    constructor(playerTexture: any, backgroundTexture: any) {
        super(playerTexture, backgroundTexture);
    }

    protected init() {
        super.init();

        this.setPlayerPosition();
        this.initNPCs();
    }

    protected initNPCs() {
        this.bartenderNPC = new BartenderNPC("Бармен Бібоп", "none");
        this.slotMachine = new SlotMachineEntity("", "none");

        this.bartenderNPC.x = GameUtils.appWidth / 2;
        this.bartenderNPC.y = this.bartenderNPC.height + 10;

        this.slotMachine.x = 100;
        this.slotMachine.y = this.bartenderNPC.height + 10;

        this.addChild(this.bartenderNPC);
        this.addChild(this.slotMachine);

        GameUtils.collibleObjectsList.push(this.bartenderNPC.getNPCParameters());
        GameUtils.collibleObjectsList.push(this.slotMachine.getNPCParameters());
    }

    protected setPlayerPosition() {
        this._playerPositionX = GameUtils.appWidth / 2;
        this._playerPositionY = GameUtils.appHeight - GameUtils.playerSizeHeight;

        this._player.x = this._playerPositionX;
        this._player.y = this._playerPositionY;
    }

    public update(): void {
        super.update();
        if (GameUtils.isInteraction(this.bartenderNPC.getNPCParameters(), this._player.getPlayerParameters())) {
            this.bartenderNPC.showInteractionKey();
        } else {
            this.bartenderNPC.hideInteractionKey();
            this.bartenderNPC.destroySpeechText();
        }

        if (GameUtils.isInteraction(this.slotMachine.getNPCParameters(), this._player.getPlayerParameters())) {
            this.slotMachine.showInteractionKey();
        } else {
            this.slotMachine.hideInteractionKey();
            if(GameUtils.isSlotTriggered){
                this.slotMachine.hide();
            }
        }
    }
}