import { Container, Graphics, Sprite, Text } from "pixi.js";
import { gsap } from "gsap";
import { symbolsArray } from "./symbolsArray";
import { AudioManager } from "../../../common/AudioManager";

export class SlotMachineAction extends Container {
    // symbols' cell positions
    // create symbols row
    protected symbol_c0 = new Text({ text: '', style:{fontSize: 50 } });
    protected symbol_c1 = new Text({ text: '', style:{fontSize: 50 } });
    protected symbol_c2 = new Text({ text: '', style:{fontSize: 50 } });

    // first row
    protected symbol_00 = new Text({ text: '', style:{fontSize: 50 } });
    protected symbol_01 = new Text({ text: '', style:{fontSize: 50 } });
    protected symbol_02 = new Text({ text: '', style:{fontSize: 50 } });

    // second row
    protected symbol_10 = new Text({ text: '', style:{fontSize: 50 } });
    protected symbol_11 = new Text({ text: '', style:{fontSize: 50 } });
    protected symbol_12 = new Text({ text: '', style:{fontSize: 50 } });

    // third row
    protected symbol_20 = new Text({ text: '', style:{fontSize: 50 } });
    protected symbol_21 = new Text({ text: '', style:{fontSize: 50 } });
    protected symbol_22 = new Text({ text: '', style:{fontSize: 50 } });

    // delete symbols row
    protected symbol_d0 = new Text({ text: '', style:{fontSize: 50 } });
    protected symbol_d1 = new Text({ text: '', style:{fontSize: 50 } });
    protected symbol_d2 = new Text({ text: '', style:{fontSize: 50 } });

    // column position (x)
    protected column_0 = 365;
    protected column_1 = 540;
    protected column_2 = 708;

    // row position (y)
    protected row_c = -15;
    protected row_0 = 85;
    protected row_1 = 185;
    protected row_2 = 285;
    protected row_d = 385;

    // arrays of columns
    protected full_column_0: Array<Text>
        = [this.symbol_00, this.symbol_10, this.symbol_20, this.symbol_c0, this.symbol_d0];
    protected full_column_1: Array<Text>
        = [this.symbol_01, this.symbol_11, this.symbol_21, this.symbol_c1, this.symbol_d1];
    protected full_column_2: Array<Text>
        = [this.symbol_02, this.symbol_12, this.symbol_22, this.symbol_c2, this.symbol_d2];

    protected all_columns: Array<Array<Text>>
        = [this.full_column_0, this.full_column_1, this.full_column_2];

    // reelWindow
    protected startReelWindow: Array<Array<string>> = [];
    protected currentReelWindow: Array<Array<string>> = [];
    protected finalReelWindow: Array<Array<string>> = [];
    protected reelSetStrip: Array<Array<string>> = [];

    protected symbolPointers = [0, 0, 0];

    protected startButton = new Container;
    protected reelsContainer = new Container;
    protected isSpining: boolean = false;

    public init() {
        this.isSpining = false;
        this.initReelsMask();
        this.initButton();
        this.initSymbolPosition();
        this.fillStartReelWindow();
        this.applyWindowToSymbols(this.startReelWindow);
    }

    protected initButton() {
        const buttonBg = new Graphics()
            .rect(-200, -450, 800, 500)
            .fill("#ff22ff");
        buttonBg.alpha = 0;

        this.startButton.addChild(buttonBg);

        this.startButton.eventMode = 'static';
        this.startButton.cursor = 'pointer';
        this.startButton.on('pointerdown', () => {
          if(!this.isSpining) this.triggerSpin();
        });

        this.startButton.x = 450;
        this.startButton.y = 500;

        this.addChild(this.startButton);
    }

    protected initReelsMask() {
        this.addChild(this.reelsContainer);
        const mask = new Graphics()
            .rect(350, 50, 1000, 300)
            .fill(0xffffff);

        this.addChild(mask);

        this.reelsContainer.mask = mask;
    }

    public triggerSpin() {
        this.isSpining = true;
        this.generateReelSetStrip();

        this.all_columns.forEach((column, colIndex) => {
            this.symbolPointers[colIndex] = 0;
            this.spinColumn(colIndex);
        });
    }

    protected spinColumn(colIndex: number) {
        const column = this.all_columns[colIndex];
        const strip = this.reelSetStrip[colIndex];
        const delay = colIndex * 0.2;

        column.forEach((symbol) => {
            gsap.to(symbol, {
                y: `+=100`,
                duration: 0.1,
                ease: "none",
                repeat: 20 + (colIndex * 5),
                delay: delay,
                onRepeat: () => {
                    if (symbol.y >= this.row_d) {
                        symbol.y = this.row_c;
                        if (this.symbolPointers[colIndex] < strip.length) {
                            symbol.text = strip[this.symbolPointers[colIndex]];
                            this.symbolPointers[colIndex]++;
                        }
                    }
                },
                onComplete: () => {
                    this.alignSymbols(colIndex);
                }
            });
        });
    }

    protected alignSymbols(colIndex: number) {
        const column = this.all_columns[colIndex];
        const finalWindow = this.finalReelWindow[colIndex];
        const targets = [this.row_c, this.row_0, this.row_1, this.row_2, this.row_d];

        const sortedSymbols = [...column].sort((a, b) => a.y - b.y);

        sortedSymbols.forEach((symbol, index) => {
            const exactTargetY = targets[index];

            if (exactTargetY === this.row_0) symbol.text = finalWindow[0];
            else if (exactTargetY === this.row_1) symbol.text = finalWindow[1];
            else if (exactTargetY === this.row_2) symbol.text = finalWindow[2];
            else {
                symbol.text = symbolsArray[Math.floor(Math.random() * symbolsArray.length)];
            }

            gsap.to(symbol, {
                y: exactTargetY,
                duration: 0.4,
                ease: "back.out(1.2)",
                onComplete: () => {
                    if (colIndex === this.all_columns.length - 1 && index === sortedSymbols.length - 1) {
                        if(this.isWin()){
                            AudioManager.playGratSound("andrew"),
                            AudioManager.playGratSound("pasha"),
                            console.log("Winner");
                        } 
                        else {
                            console.log("Lose");
                        }
                        this.isSpining = false;
                    }
                }
            });
        });
    }

    protected isWin(): boolean{
        let finalWindow = this.finalReelWindow;
        let combination = [];

        for(let col = 0; col < finalWindow.length; col++){
            for(let row = 0; row < finalWindow[col].length; row++){
                if(row === 1){
                    combination.push(finalWindow[col][row]); 
                }
            }
        }

        return combination.every(value => value === combination[0]);
    }

    protected applyWindowToSymbols(window: string[][]) {
        for (let col = 0; col < 3; col++) {
            this.all_columns[col][0].text = window[col][0];
            this.all_columns[col][1].text = window[col][1];
            this.all_columns[col][2].text = window[col][2];
        }
    }

    protected fillStartReelWindow() {
        this.startReelWindow = [
            ["", "", ""], // column 1
            ["", "", ""], // column 2
            ["", "", ""] // column 3
        ];

        for (let col = 0; col < this.startReelWindow.length; col++) {
            for (let row = 0; row < this.startReelWindow[col].length; row++) {
                let symbol = Math.floor(Math.random() * symbolsArray.length);
                this.startReelWindow[col][row] = symbolsArray[symbol];
            }
        }

        console.log(this.startReelWindow);
    }

    protected fillFinalReelWindow() {
        this.finalReelWindow = [
            ["", "", ""], // column 1
            ["", "", ""], // column 2
            ["", "", ""] // column 3
        ];

        for (let col = 0; col < this.finalReelWindow.length; col++) {
            for (let row = 0; row < this.finalReelWindow[col].length; row++) {
                let symbol = Math.floor(Math.random() * symbolsArray.length);
                this.finalReelWindow[col][row] = symbolsArray[symbol];
            }
        }

        console.log(this.finalReelWindow);
    }

    protected generateReelSetStrip() {
        this.reelSetStrip = [];
        for (let col = 0; col < 3; col++) {
            const column: string[] = [];
            for (let i = 0; i < 18; i++) {
                column.push(
                    symbolsArray[
                    Math.floor(Math.random() * symbolsArray.length)
                    ]
                );
            }
            this.reelSetStrip.push(column);
        }
        this.fillFinalReelWindow();
        this.appendFinalToReelStrip();

        console.log(this.reelSetStrip);
    }

    protected appendFinalToReelStrip() {
        for (let col = 0; col < this.reelSetStrip.length; col++) {
            this.reelSetStrip[col].push(...this.finalReelWindow[col]);
        }
    }

    protected initSymbolPosition() {
        this.symbol_c0.text = "X";
        this.symbol_c0.x = this.column_0;
        this.symbol_c0.y = this.row_c;

        this.symbol_c1.text = "X";
        this.symbol_c1.x = this.column_1;
        this.symbol_c1.y = this.row_c;

        this.symbol_c2.text = "X";
        this.symbol_c2.x = this.column_2;
        this.symbol_c2.y = this.row_c;

        this.symbol_00.text = "X";
        this.symbol_00.x = this.column_0;
        this.symbol_00.y = this.row_0;

        this.symbol_01.text = "X";
        this.symbol_01.x = this.column_1;
        this.symbol_01.y = this.row_0;

        this.symbol_02.text = "X";
        this.symbol_02.x = this.column_2;
        this.symbol_02.y = this.row_0;

        this.symbol_10.text = "X";
        this.symbol_10.x = this.column_0;
        this.symbol_10.y = this.row_1;

        this.symbol_11.text = "X";
        this.symbol_11.x = this.column_1;
        this.symbol_11.y = this.row_1;

        this.symbol_12.text = "X";
        this.symbol_12.x = this.column_2;
        this.symbol_12.y = this.row_1;

        this.symbol_20.text = "X";
        this.symbol_20.x = this.column_0;
        this.symbol_20.y = this.row_2;

        this.symbol_21.text = "X";
        this.symbol_21.x = this.column_1;
        this.symbol_21.y = this.row_2;

        this.symbol_22.text = "X";
        this.symbol_22.x = this.column_2;
        this.symbol_22.y = this.row_2;

        this.symbol_d0.text = "X";
        this.symbol_d0.x = this.column_0;
        this.symbol_d0.y = this.row_d;

        this.symbol_d1.text = "X";
        this.symbol_d1.x = this.column_1;
        this.symbol_d1.y = this.row_d;

        this.symbol_d2.text = "X";
        this.symbol_d2.x = this.column_2;
        this.symbol_d2.y = this.row_d;


        this.reelsContainer.addChild(this.symbol_c0);
        this.reelsContainer.addChild(this.symbol_c1);
        this.reelsContainer.addChild(this.symbol_c2);

        this.reelsContainer.addChild(this.symbol_00);
        this.reelsContainer.addChild(this.symbol_01);
        this.reelsContainer.addChild(this.symbol_02);

        this.reelsContainer.addChild(this.symbol_10);
        this.reelsContainer.addChild(this.symbol_11);
        this.reelsContainer.addChild(this.symbol_12);

        this.reelsContainer.addChild(this.symbol_20);
        this.reelsContainer.addChild(this.symbol_21);
        this.reelsContainer.addChild(this.symbol_22);

        this.reelsContainer.addChild(this.symbol_d0);
        this.reelsContainer.addChild(this.symbol_d1);
        this.reelsContainer.addChild(this.symbol_d2);
    }
}