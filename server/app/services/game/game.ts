import { GameType, HasId } from "../../../../common/communication/game-description";
import { SceneData } from "../../../../common/communication/geometry";
import { VectorInterface } from "../../../../common/communication/vector-interface";
import { BMPImage } from "../../../../common/images/bmp-image";
import { DifferenceImage } from "../../../../common/images/difference-image";
import { ImageType } from "../../../../common/images/image-type";
import { Pixel } from "../../../../common/images/pixel";
import { SceneDifferenceRestorationService } from "../scene/scene-difference-restoration";
import { FileIO } from "../utils/file-io.util";

export abstract class AbstractGame implements HasId {
    public images: BMPImage[];
    public differenceImage: DifferenceImage;
    public scene: SceneData;

    public constructor(public id: string, name: string, public type: GameType) {
        this.images = [];
        this.setUp(name);
    }

    protected abstract setUp(name: string): void;

    public async restoreModifiedImage(x: number, y: number): Promise<{}> {
        const index: number = this.differenceImage.getIndex({ i: x, j: y });
        const difference: number[] = this.differenceImage.getDifferenceAt(index);

        difference.forEach((differenceIndex: number) => {
            this.images[ImageType.Modified].placePixel(differenceIndex, this.images[ImageType.Original].pixelAt(differenceIndex));
            this.differenceImage.placePixel(differenceIndex, Pixel.WHITE_PIXEL);
        });

        return this.saveModifiedImage();
    }

    private async saveModifiedImage(): Promise<{}> {
        return FileIO.writeFile(`uploads/${this.id}.bmp`, Buffer.from(this.images[ImageType.Modified].toArray()));
    }

    public restoreModifiedScene(position: VectorInterface): void {
        const differenceRestoration: SceneDifferenceRestorationService = new SceneDifferenceRestorationService(this.scene);
        this.scene = differenceRestoration.getSceneAfterDifferenceUpdate(position);
        this.saveModifiedScene();
    }

    private saveModifiedScene(): void {
        FileIO.writeFile(`uploads/${this.id}-data.txt`, Buffer.from(JSON.stringify(this.scene)))
            .catch((err: Error) => console.error(err));
    }
}
