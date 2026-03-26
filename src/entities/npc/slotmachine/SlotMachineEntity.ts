import { GameUtils } from "../../../common/GameUtils";
import { BaseNPC } from "../BaseNPC";
import { SlotMachineScene } from "./SlotMachineScene";

export class SlotMachineEntity extends BaseNPC{
    protected slotMachineScene!: SlotMachineScene;

    constructor(npcName: string, npcTexture: string){
        super(npcName, npcTexture);
    }

    protected onInteractionKeyPressed(event: any){
        if(!this.isInterationKeyShowed){
            return
        }
        if(event.code !== this.interactionKey){
            return;
        }
        if(!this.slotMachineScene){
            this.slotMachineScene = new SlotMachineScene();
            this.addChild(this.slotMachineScene);
        }

        this.show();
    }

    public show(){
        this.slotMachineScene.alpha = 1;
        this.slotMachineScene.visible = true;
    }

    public hide(){
        this.slotMachineScene.alpha = 0;
        this.slotMachineScene.visible = false;
    }
}