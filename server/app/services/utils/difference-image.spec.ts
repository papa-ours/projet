import { expect } from "chai";
import * as fs from "fs";
import { HEIGHT, WIDTH } from "../../../../common/communication/constants";
import { BMPImage } from "../../../../common/images/bmp-image";
import { DifferenceImage } from "../../../../common/images/difference-image";
import { Pixel } from "../../../../common/images/pixel";

describe("difference-image", () => {

    let differenceImage: DifferenceImage;

    const imageArray: Uint8Array = fs.readFileSync("../client/src/assets/img/dog.bmp");

    const imageBMP: BMPImage = BMPImage.fromArray(imageArray);
    const pixels: Pixel[] = imageBMP.pixels;
    const header: Uint8Array = imageBMP.header;

    before(() => {
        differenceImage = new DifferenceImage(pixels, header, WIDTH, HEIGHT);
    });

    it("should convert from BMPImage to DifferenceImage properly", () => {
        const expected: DifferenceImage = differenceImage;
        const result: DifferenceImage = DifferenceImage.fromBMPImage(imageBMP);

        expect(result).to.deep.equal(expected);
    });

    it("should convert from Array to DifferenceImage properly", () => {
        const expected: DifferenceImage = differenceImage;
        const result: DifferenceImage = DifferenceImage.fromArray(imageArray);

        expect(expected).to.deep.equal(result);
    });
});
