import { Container, Graphics } from "pixi.js";
import { SlotMachineAction } from "./SlotMachineAction";

export class SlotMachineScene extends Container{
    constructor(){
        super();

        this.init();
    }

    protected init(){
        let slotMachineBG = new Graphics()
            .rect(40, -50, 1000, 500)
            .fill('#D2C4B4');
        
        let slotMachineReelSetWindow = new Graphics()
            .rect(290, 50, 500, 300)
            .fill('#fff');
        
        this.addChild(slotMachineBG);
        slotMachineBG.addChild(slotMachineReelSetWindow);

        let testSymbol = new SlotMachineAction()
        testSymbol.init();
        slotMachineReelSetWindow.addChild(testSymbol);
    }
}