import { GameSheetDescription, TopScoresInterface } from "../../../common/communication/game-description";
import { BMPImage } from "./utils/bmp-image";

export class Game implements GameSheetDescription {
    public id: string;
    public preview: string;
    public name: string;
    public topScores: TopScoresInterface[];
    public modifiedImage: string;
    public differenceImage: BMPImage;

    public constructor(gameSheetDescription: GameSheetDescription, modifiedImage: string, differenceImage: BMPImage) {
        this.id = gameSheetDescription.id;
        this.preview = gameSheetDescription.preview;
        this.name = gameSheetDescription.name;
        this.topScores = gameSheetDescription.topScores;
        this.modifiedImage = modifiedImage;
        this.differenceImage = differenceImage;
    }
}
