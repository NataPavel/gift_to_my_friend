import { Container, Graphics, Text } from "pixi.js";
import { BaseNPC } from "./BaseNPC";
import { bartenderDialogue } from "./dialogs/bartenderDialog";
import { CoinGame } from "../../coingame/CoinGame";
import { GameUtils } from "../../common/GameUtils";
import { AudioManager } from "../../common/AudioManager";

export class Pasha extends BaseNPC{
    protected pashaSpeech = new Text({
        text: 'З днем народження!',
        style: { fill: "#ffffff"}
    });

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

        if(!this.pashaSpeech.parent){
            this.addChild(this.pashaSpeech);
        }

        AudioManager.playGratSound("pasha");
    }

    public destroySpeechText(){
        if(this.pashaSpeech.parent){
            this.removeChild(this.pashaSpeech);
        }
    }
}