import { Container, Graphics } from "pixi.js";
import { Player } from "../entities/player/Player";
import { GameUtils } from "../common/GameUtils";

export class BaseScene extends Container{
    protected _backgroundTexture: any;
    protected _playerTexture: any;
    protected _player!: Player;
    protected _playerPositionX!: number;
    protected _playerPositionY!: number;

    constructor(playerTexture: any, backgroundTexture: any){
        super();
        this._playerTexture = playerTexture;
        this._backgroundTexture = backgroundTexture;
        this.init();
    }

    protected init(){
        this._player = new Player(this._playerTexture);
        let baseSceneBG = new Graphics()
            .rect(0, 0, GameUtils.appWidth, GameUtils.appHeight)
            .fill(0xFF5B5B);

        this.addChild(baseSceneBG);
        this.addChild(this._player);
    }

    protected initNPCs(){}

    public update(){
        this._player.update();
    }

    public destroy(){}
}