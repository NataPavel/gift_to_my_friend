import { Container, Graphics } from "pixi.js";
import { SlotMachineAction } from "./SlotMachineAction";
import { GameUtils } from "../../../common/GameUtils";

export class SlotMachineScene extends Container{
    constructor(){
        super();

        this.init();
    }

    protected init(){
        GameUtils.isSlotTriggered = true;
        let slotMachineBG = new Graphics()
            .rect(40, -50, 1000, 500)
            .fill('#D2C4B4');
        
        let slotMachineReelSetWindow = new Graphics()
            .rect(290, 50, 500, 300)
            .fill('#fff');
        let slotMachineMaskTop = new Graphics()
            .rect(40, -50, 1000, 100)
            .fill('#ff22ff');
        let slotMachineMaskBottom = new Graphics()
            .rect(40, 350, 1000, 150)
            .fill('#ff22ff');
        
        this.addChild(slotMachineBG);
        slotMachineBG.addChild(slotMachineReelSetWindow);

        let testSymbol = new SlotMachineAction()
        testSymbol.init();
        slotMachineReelSetWindow.addChild(testSymbol);
        // slotMachineBG.addChild(slotMachineMaskTop);
        // slotMachineBG.addChild(slotMachineMaskBottom);
    }
}