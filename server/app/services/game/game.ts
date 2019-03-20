import { GameType, HasId } from "../../../../common/communication/game-description";
import { SceneData } from "../../../../common/communication/geometry";
import { VectorInterface } from "../../../../common/communication/vector-interface";
import { BMPImage } from "../../../../common/images/bmp-image";
import { DifferenceImage } from "../../../../common/images/difference-image";
import { ImageType } from "../../../../common/images/image-type";
import { Pixel } from "../../../../common/images/pixel";
import { SceneDifferenceRestorationService } from "../scene/scene-difference-restoration";
import { FileIO } from "../utils/file-io.util";

export class AbstractGame implements HasId {
    public images: BMPImage[];
    public differenceImage: DifferenceImage;
    public scene: SceneData;

    public constructor(public id: string, name: string, public type: GameType) {
        this.images = [];
        // triple equal problem
        // tslint:disable-next-line:triple-equals
        if (type == GameType.Free) {
            this.setupScene(name);
        } else {
            this.setupImages(name);
        }
    }

    private setupImages(name: string): void {
        const imageTypes: string[] = ["original", "modified", "difference"];
        imageTypes.forEach(async (type: string, index: number) => {
            const data: Uint8Array = await FileIO.readFile(`uploads/${name}-${type}Image.bmp`);
            if (index === ImageType.Difference) {
                this.differenceImage = DifferenceImage.fromArray(data);
            } else {
                this.images[index] = BMPImage.fromArray(data);
            }
        });
    }

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

    private setupScene(name: string): void {
        FileIO.readFile(`uploads/${name}-data.txt`).then((data: Buffer) =>
            this.scene = JSON.parse(data.toString()),
        );
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
