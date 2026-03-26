import { Container, EventEmitter, Graphics, Text } from "pixi.js";
import { entityParameterType } from "../types/EntityParametersType";
import { GameUtils } from "../../common/GameUtils";

export class BaseNPC extends Container{
    protected npcName: string;
    protected npcTexture: string;

    protected npcWidth: number = 50;
    protected npcHeight: number = 50;
    protected isInterationKeyShowed: boolean = false;

    protected interactionKey: string = "KeyE";
    protected interactionKeyText = new Text({
        text: 'Натисни E',
        alpha: 0,
        style: {
        fill: "#1ce365", 
        stroke: {
            width: 8,
            color: "#000"
        }}
    });
    protected npcDefaultSpeech = new Text({
        text: 'З днем народження!',
        style: {fill: "#ffffff"}
    });

    constructor(npcName: string, npcTexture: string){
        super();

        this.npcName = npcName;
        this.npcTexture = npcTexture;

        this.init();

        window.addEventListener("keydown", this.onInteractionKeyPressed.bind(this));
    }

    protected init(){
        let testNPC = new Graphics().rect(0, 0, 50, 50).fill("254F22");
        this.addChild(testNPC);
        testNPC.alpha = 0;

        const npcNameTextToDisplay = new Text({
            text: this.npcName,
            style: {fill: "#ffffff"}
        })

        npcNameTextToDisplay.alpha = 0;

        npcNameTextToDisplay.x = 0;
        npcNameTextToDisplay.y -= 25;

        this.interactionKeyText.x -= 85;
        this.interactionKeyText.y += 10;

        this.addChild(npcNameTextToDisplay);
        this.addChild(this.interactionKeyText);
    }

    // on interation with player should display speech bubble
    protected onInteractionKeyPressed(event: any){
        if(event.code === this.interactionKey && this.isInterationKeyShowed){
            this.addChild(this.npcDefaultSpeech);
        }
    }

    public showInteractionKey(){
        this.interactionKeyText.alpha = 1;
        this.isInterationKeyShowed = true;
    }

    public hideInteractionKey(){
        this.interactionKeyText.alpha = 0;
        this.isInterationKeyShowed = false;
    }

    public getNPCParameters(): entityParameterType{
        return {
            x: this.x,
            y: this.y,
            width: this.npcWidth,
            height: this.npcHeight
        };
    }

    public destroySpeechText(){
        if(this.npcDefaultSpeech.parent){
            this.removeChild(this.npcDefaultSpeech);
        }
    }

    public update(){
    }
}