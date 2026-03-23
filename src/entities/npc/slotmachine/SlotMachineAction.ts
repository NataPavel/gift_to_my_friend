import { Container, Text } from "pixi.js";

export class SlotMachineAction extends Container{
    // symbols' cell positions

    // create symbols row
    protected symbol_c0 = new Text({text: ''});
    protected symbol_c1 = new Text({text: ''});
    protected symbol_c2 = new Text({text: ''});

    // first row
    protected symbol_00 = new Text({text: ''});
    protected symbol_01 = new Text({text: ''});
    protected symbol_02 = new Text({text: ''});

    // second row
    protected symbol_10 = new Text({text: ''});
    protected symbol_11 = new Text({text: ''});
    protected symbol_12 = new Text({text: ''});

    // third row
    protected symbol_20 = new Text({text: ''});
    protected symbol_21 = new Text({text: ''});
    protected symbol_22 = new Text({text: ''});

    // delete symbols row
    protected symbol_d0 = new Text({text: ''});
    protected symbol_d1 = new Text({text: ''});
    protected symbol_d2 = new Text({text: ''});

    // column position (x)
    protected column_0 = 365;
    protected column_1 = 530;
    protected column_2 = 698;

    // row position (y)
    protected row_0 = 85;
    protected row_1 = 185;
    protected row_2 = 285;
    protected row_d = 385;

    public init(){
        this.initSymbolPosition();
    }

    protected initSymbolPosition(){
        this.symbol_c0.text = "X";
        this.symbol_c0.x = this.column_0;
        this.symbol_c0.y = 0;

        this.symbol_c1.text = "X";
        this.symbol_c1.x = this.column_1;

        this.symbol_c2.text = "X";
        this.symbol_c2.x = this.column_2;
        
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


        this.addChild(this.symbol_c0);
        this.addChild(this.symbol_c1);
        this.addChild(this.symbol_c2);

        this.addChild(this.symbol_00);
        this.addChild(this.symbol_01);
        this.addChild(this.symbol_02);

        this.addChild(this.symbol_10);
        this.addChild(this.symbol_11);
        this.addChild(this.symbol_12);

        this.addChild(this.symbol_20);
        this.addChild(this.symbol_21);
        this.addChild(this.symbol_22);

        this.addChild(this.symbol_d0);
        this.addChild(this.symbol_d1);
        this.addChild(this.symbol_d2);
    }
}