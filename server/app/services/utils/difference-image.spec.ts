import { expect } from "chai";
import * as fs from "fs";
import { BMPImage } from "../../../../common/images/bmp-image";
import { DifferenceImage } from "../../../../common/images/difference-image";
import { Pixel } from "../../../../common/images/pixel";

describe("difference-image", () => {

    const width: number = 640;
    const height: number = 480;

    let differenceImage: DifferenceImage;

    const imageArray: Uint8Array = fs.readFileSync("../client/src/assets/img/dog.bmp");

    const imageBMP: BMPImage = BMPImage.fromArray(imageArray);
    const pixels: Pixel[] = imageBMP.pixels;
    const header: Uint8Array = imageBMP.header;

    before(() => {
        differenceImage = new DifferenceImage(pixels, header, width, height);
    });

    it.skip("should convert from BMPImage to DifferenceImage properly", () => {
        const expected: DifferenceImage = differenceImage;
        const result: DifferenceImage = DifferenceImage.fromBMPImage(imageBMP);
        expect(result).to.be.equal(expected);
    });

    it.skip("should convert from Array to DifferenceImage properly", () => {
        const expected: DifferenceImage = differenceImage;
        const result: DifferenceImage = DifferenceImage.fromArray(imageArray);
        expect(expected).to.be.equal(result);
    });
});
