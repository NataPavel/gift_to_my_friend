import * as PIXI from "pixi.js"
import { BaseScene } from "../scenes/BaseScene";
import { TavernScene } from "../scenes/TavernScene";
import { GameUtils } from "./GameUtils";

export class Application{
    protected static app: PIXI.Application;
    protected static _currentScene: BaseScene;

    protected static _playerTexture: any;
    protected static _backgroundTexture: any;

    protected static textures: Array<string>;
    
    public static async init(): Promise<void>{
        this.app = new PIXI.Application()

        await this.app.init({
            width: 1280,
            height: 720,
            backgroundColor: "30364F"
            }  
        );

        this.app.canvas.style.position = "absolute";
        document.body.appendChild(this.app.canvas);
        
        this.initGameUtils();

        this.changeForCurrentScene();

        this.app.ticker.add(() => {
            this._currentScene.update();
        });
    }

    protected static changeForCurrentScene(sceneReplaceWith?: BaseScene){
        if(!this._currentScene){
            this._currentScene = new TavernScene(this._playerTexture, this._backgroundTexture);
            this.app.stage.addChild(this._currentScene);
        }
    }

    protected static initGameUtils(){
        GameUtils.appWidth = this.app.screen.width;
        GameUtils.appHeight = this.app.screen.height;
        GameUtils.playerSizeWidth = 50;
        GameUtils.playerSizeHeight = 50;
    }

    protected static setTextures(){
        // here will be inserted textures
    }
}