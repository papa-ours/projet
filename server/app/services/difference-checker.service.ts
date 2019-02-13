import Axios, { AxiosResponse } from "axios";
import { injectable } from "inversify";
import "reflect-metadata";
import { Message } from "../../../common/communication/message";
import { BMPImage } from "../../../common/images/bmp-image";
import { DifferenceImage } from "../../../common/images/difference-image";
import { Pixel } from "../../../common/images/pixel";

@injectable()
export class DifferenceCheckerService {
    public async isPositionDifference(x: number, y: number, id: string): Promise<boolean> {
        return Axios.get<Message>("http://localhost:3000/api/game/" + id + "/differenceImage").then(
            // tslint:disable-next-line:no-any
            (response: AxiosResponse<any>) => {
                const differenceImage: BMPImage = DifferenceImage.fromString(response.data.body);

                return this.checkDifference(x, y, differenceImage);
            },
        ).catch((error: Error) => {
            console.error("ERROR !", error.message);

            return false;
        });
    }

    private checkDifference(x: number, y: number, image: BMPImage): boolean {
        const index: number = image.getIndex({ i: x, j: y });
        const pixel: Pixel = image.pixelAt(index);

        return pixel ? pixel.equals(Pixel.BLACK_PIXEL) : false;
    }
}
