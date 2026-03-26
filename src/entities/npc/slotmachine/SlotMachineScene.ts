import { Container, Graphics, Sprite } from "pixi.js";
import { SlotMachineAction } from "./SlotMachineAction";
import { GameUtils } from "../../../common/GameUtils";

export class SlotMachineScene extends Container{
    constructor(){
        super();

        this.init();
    }

    protected init(){
        GameUtils.isSlotTriggered = true;
        let slotMachineBG = Sprite.from("slotmachine_bg");
        slotMachineBG.x = -600;
        slotMachineBG.y = -200;
        
        let slotMachineReelSetWindow = new Graphics()
            .roundRect(48, 235, 250, 155)
            .fill('#dcd5d5');
        
        this.addChild(slotMachineBG);
        slotMachineBG.addChild(slotMachineReelSetWindow);

        let testSymbol = new SlotMachineAction()
        testSymbol.init();
        testSymbol.scale.set(0.5);
        testSymbol.x -= 110;
        testSymbol.y += 215;
        slotMachineReelSetWindow.addChild(testSymbol);
    }
}