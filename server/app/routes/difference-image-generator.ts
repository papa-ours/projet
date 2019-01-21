import { Request, Response } from "express";
import { injectable } from "inversify";
import "reflect-metadata";
import { Message } from "../../../common/communication/message";

@injectable()
export class DifferenceImageGenerator {
    public generate(req: Request, res: Response): void {
        const originalImageData: Uint8Array =
            JSON.parse("[" + req.body.originalImage + "]");
        const modifiedImageData: Uint8Array =
            JSON.parse("[" + req.body.modifiedImage + "]");
    }

    private isImageBMP(imageData: Uint8Array): boolean {
        const B_CODE: number = 66;
        const M_CODE: number = 77;

        return (imageData[0] === B_CODE && imageData[1] === M_CODE);
    }
}
