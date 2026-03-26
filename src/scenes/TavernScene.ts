import { Assets, Container, EventEmitter, Graphics, Sprite, Text } from "pixi.js";
import { GameUtils } from "../common/GameUtils";
import { BartenderNPC } from "../entities/npc/BartenderNPC";
import { BaseScene } from "./BaseScene";
import { SlotMachineEntity } from "../entities/npc/slotmachine/SlotMachineEntity";
import { Andrew } from "../entities/npc/Andrew";
import { Pasha } from "../entities/npc/Pasha";
import { BaseNPC } from "../entities/npc/BaseNPC";

export class TavernScene extends BaseScene {
    protected bartenderNPC!: BartenderNPC;
    protected andrew!: Andrew;
    protected pasha!: Pasha;
    protected slotMachine!: SlotMachineEntity;
    protected justNPC!: BaseNPC;
    protected allNPC: Set<any> = new Set();

    constructor(playerTexture: any, backgroundTexture: any) {
        super(playerTexture, backgroundTexture);
    }

    protected init() {
        const texture = Assets.get("bg_texture");
        if (texture) {
            let baseSceneBG = new Sprite(texture);
            baseSceneBG.x -= 40;
            this.addChild(baseSceneBG);
            console.log("BG added successfully");
        } else {
            console.error(`Texture ${texture} not found! Check if loadAssets finished.`);
        }

        super.init();

        this.setPlayerPosition();
        this.initNPCs();
    }

    protected initNPCs() {
        this.bartenderNPC = new BartenderNPC("Бармен Бібоп", "none");
        this.slotMachine = new SlotMachineEntity("", "none");
        this.andrew = new Andrew("Андрій", "none");
        this.pasha = new Pasha("Паша", "none");
        this.justNPC = new BaseNPC("Віталя", "none");

        this.bartenderNPC.x = GameUtils.appWidth / 2 + 140;
        this.bartenderNPC.y = this.bartenderNPC.height + 40;

        this.andrew.x = GameUtils.appWidth / 2 + 125;
        this.andrew.y = this.andrew.height + 380;

        this.pasha.x = GameUtils.appWidth / 2 - 100;
        this.pasha.y = this.pasha.height + 380;

        this.justNPC.x = GameUtils.appWidth / 2 - 450;
        this.justNPC.y = this.justNPC.height + 380;

        this.slotMachine.x = GameUtils.appWidth - 170;
        this.slotMachine.y = this.bartenderNPC.height + 70;

        this.addChild(this.bartenderNPC);
        this.addChild(this.andrew);
        this.addChild(this.pasha);
        this.addChild(this.slotMachine);
        this.addChild(this.justNPC);

        this.initEmptyObjects();

        GameUtils.collibleObjectsList.push(this.bartenderNPC.getNPCParameters());
        GameUtils.collibleObjectsList.push(this.slotMachine.getNPCParameters());
        GameUtils.collibleObjectsList.push(this.andrew.getNPCParameters());
        GameUtils.collibleObjectsList.push(this.pasha.getNPCParameters());
        GameUtils.collibleObjectsList.push(this.justNPC.getNPCParameters());
    }

    protected setPlayerPosition() {
        this._playerPositionX = GameUtils.appWidth / 2;
        this._playerPositionY = GameUtils.appHeight - GameUtils.playerSizeHeight;

        this._player.x = this._playerPositionX;
        this._player.y = this._playerPositionY;
    }

    protected initEmptyObjects(){
        GameUtils.collibleObjectsList.push({x: 0,y: 0,width: 100,height: 800});
        GameUtils.collibleObjectsList.push({x: 0,y: 150, width: 500,height: 10});
        GameUtils.collibleObjectsList.push({x: 450,y: 150, width: 50,height: 150});
        GameUtils.collibleObjectsList.push({x: 450,y: 250, width: 650,height: 10});
        GameUtils.collibleObjectsList.push({x: 1000,y: 50, width: 50,height: 200});
        GameUtils.collibleObjectsList.push({
            x: GameUtils.appWidth - 50,
            y: 0,
            width: 100,
            height: 800
        });
    }

    public update(): void {
        super.update();

        if(!this.allNPC.has(this.bartenderNPC)) this.allNPC.add(this.bartenderNPC);
        if(!this.allNPC.has(this.andrew)) this.allNPC.add(this.andrew);
        if(!this.allNPC.has(this.pasha)) this.allNPC.add(this.pasha);
        if(!this.allNPC.has(this.justNPC)) this.allNPC.add(this.justNPC);

        this.allNPC.forEach((element) => {
            if (GameUtils.isInteraction(element.getNPCParameters(), this._player.getPlayerParameters())) {
                element.showInteractionKey();
            } else {
                element.hideInteractionKey();
                element.destroySpeechText();
            }
        });

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