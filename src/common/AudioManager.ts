import { Howl } from 'howler';

export class AudioManager{
    protected static backgroundMusic: Howl;
    protected static andrew: Howl;
    protected static pasha: Howl;

    public static init(){
        this.backgroundMusic = new Howl({
            src: ['assets/sounds/hb_back.mp3'],
            loop: true,
            volume: 0.01
        });

        this.andrew = new Howl({
            src: ['assets/sounds/andrew.mp3'],
            loop: false,
            volume: 0.5
        });

        this.pasha = new Howl({
            src: ['assets/sounds/pasha.mp3'],
            loop: false,
            volume: 0.5
        });

        this.backgroundMusic.play();
    }

    public static playGratSound(name: string){
        if(name === "andrew") this.andrew.play();
        else this.pasha.play();
    }
}