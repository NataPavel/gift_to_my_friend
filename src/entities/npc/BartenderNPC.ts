import { Container, Graphics, Text } from "pixi.js";
import { BaseNPC } from "./BaseNPC";
import { bartenderDialogue } from "./dialogs/bartenderDialog";
import { CoinGame } from "../../coingame/CoinGame";

export class BartenderNPC extends BaseNPC{
    protected bartenderSpeech = new Text({text: ''});

    protected dialogueLineIndex: number = 0;

    protected swordSideButton = new Container;
    protected shieldSideButton = new Container;

    protected swordSideText = new Text({text: 'Sword'});
    protected shieldSideText = new Text({text: 'Shield'});

    protected coinGame = new CoinGame();
    protected choosedSide: string = "";

    constructor(npcName: string, npcTexture: string){
        super(npcName, npcTexture);

        this.dialogueLineIndex = 0;
        this.choosedSide = "";

        this.initButtons();
    }

    protected onInteractionKeyPressed(event: any){
        if(!this.isInterationKeyShowed){
            return
        }
        if(event.code !== this.interactionKey){
            return;
        }
        if(!this.bartenderSpeech.parent){
            this.addChild(this.bartenderSpeech);
        }

        if(bartenderDialogue.beforeGame[this.dialogueLineIndex] === 
            bartenderDialogue.beforeGame[bartenderDialogue.beforeGame.length - 1]
        ){
            this.chooseCoinSide();
        }
        
        if(bartenderDialogue.beforeGame[this.dialogueLineIndex]){
            this.bartenderSpeech.text = bartenderDialogue.beforeGame[this.dialogueLineIndex]
            this.dialogueLineIndex += 1;
        }
    
    }

    protected chooseCoinSide(){
        this.showButtons();

        this.swordSideButton.on("pointerdown", () => {
            this.choosedSide = "sword";
            this.coinGame.triggerCoinGame(this.choosedSide);
            this.destroyButtons();
        });

        this.shieldSideButton.on("pointerdown", () => {
            this.choosedSide = "shieldSideButton";
            this.coinGame.triggerCoinGame(this.choosedSide);
            this.destroyButtons();
        });
    }

    protected showButtons(){
        this.swordSideButton.alpha = 1;
        this.shieldSideButton.alpha = 1;

        this.swordSideText.alpha = 1;
        this.shieldSideText.alpha = 1;
    }

    protected initButtons(){
        const swordButtonBG = new Graphics()
            .roundRect(0, 0, 80, 40, 12)
            .fill(0x3a86ff);
        const shieldButtonBG = new Graphics()
            .roundRect(0, 0, 80, 40, 12)
            .fill(0x3a86ff);

        this.shieldSideButton.y = 100;
        this.swordSideButton.addChild(swordButtonBG);
        this.shieldSideButton.addChild(shieldButtonBG);

        this.swordSideButton.addChild(this.swordSideText);
        this.shieldSideButton.addChild(this.shieldSideText);

        this.addChild(this.swordSideButton);
        this.addChild(this.shieldSideButton);

        this.swordSideButton.eventMode = "static";
        this.swordSideButton.cursor = "pointer";

        this.shieldSideButton.eventMode = "static";
        this.shieldSideButton.cursor = "pointer";

        this.swordSideButton.alpha = 0;
        this.shieldSideButton.alpha = 0;

        this.swordSideText.alpha = 0;
        this.shieldSideText.alpha = 0;
    }

    protected destroyButtons(){
        if(this.swordSideButton.parent && this.shieldSideButton.parent){
            this.swordSideText.destroy();
            this.shieldSideText.destroy();

            this.swordSideButton.destroy();
            this.shieldSideButton.destroy();
        }
    }

    public destroySpeechText(){
        if(this.bartenderSpeech.parent){
            this.removeChild(this.bartenderSpeech);
            this.dialogueLineIndex = 0;
        }
    }
}