import { GameType, HasId } from "../../../../common/communication/game-description";
import { SceneData } from "../../../../common/communication/geometry";
import { BMPImage } from "../../../../common/images/bmp-image";
import { DifferenceImage } from "../../../../common/images/difference-image";

export abstract class AbstractGame implements HasId {
    public images: BMPImage[];
    public differenceImage: DifferenceImage;
    public scene: SceneData;

    public constructor(public id: string, name: string, public type: GameType) {
        this.images = [];
        this.setUp(name);
    }

    protected abstract setUp(name: string): void;

}
