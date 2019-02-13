import { expect } from "chai";
import * as fs from "fs";
import { BMPImage } from "../../../../common/images/bmp-image";
import { DifferenceImage } from "../../../../common/images/difference-image";
import { Pixel } from "../../../../common/images/pixel";

describe("difference-image", () => {

    const width: number = 640;
    const height: number = 480;

    let differenceImage: DifferenceImage;

    before(() => {
        differenceImage =  new DifferenceImage(pixels, header, width, height);
    });
    const imageArray: Uint8Array = fs.readFileSync("../client/src/assets/img/dog.bmp");
    const imageBMP: BMPImage = BMPImage.fromArray(fs.readFileSync("../client/src/assets/img/dog.bmp"));
    const pixels: Pixel[] = imageBMP.pixels;
    const header: Uint8Array = imageBMP.header;

    it("should test something", () => {
        expect(true).to.be.equal(true);
    });
    it.skip("should convert from BMPImage to DifferenceImage properly", () => {
        expect(DifferenceImage.fromBMPImage(imageBMP)).to.be.equal(differenceImage);
    });
    it.skip("should convert from Array to DifferenceImage properly", () => {
        expect(DifferenceImage.fromArray(imageArray)).to.be.equal(differenceImage);
    });
});
