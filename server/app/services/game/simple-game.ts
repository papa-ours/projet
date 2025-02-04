import { GameMode, GameType } from "../../../../common/communication/game-description";
import { BMPImage } from "../../../../common/images/bmp-image";
import { DifferenceImage } from "../../../../common/images/difference-image";
import { ImageType } from "../../../../common/images/image-type";
import { Pixel } from "../../../../common/images/pixel";
import { AWSFilesUtil } from "../utils/aws-files.util";
import { FileIO } from "../utils/file-io.util";
import { AbstractGame } from "./game";

export class SimpleGame extends AbstractGame {

    public images: BMPImage[];
    public differenceImage: DifferenceImage;

    private constructor(id: string, name: string, sheetId: string, mode: GameMode) {
        super(id, sheetId, name, mode, GameType.Simple);
        this.images = [];
    }

    public static async create(id: string, sheetId: string, mode: GameMode, name: string): Promise<SimpleGame> {
        const game: SimpleGame = new SimpleGame(id, name, sheetId, mode);

        return game.setUp(name).then(() => game);
    }

    protected async setUp(name: string): Promise<{}> {
        const imageTypes: string[] = ["original", "modified", "difference"];

        return Promise.all(imageTypes.map(async (type: string, index: number) => {
            const data: Uint8Array = (await AWSFilesUtil.readFile(`${name}-${type}Image.bmp`)).Body as Uint8Array;
            if (index === ImageType.Difference) {
                this.differenceImage = DifferenceImage.fromArray(data);
            } else {
                this.images[index] = BMPImage.fromArray(data);
            }
        }));
    }

    public async cleanUp(): Promise<{}> {
        return FileIO.deleteFile(`uploads/${this.id}.bmp`);
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
}
