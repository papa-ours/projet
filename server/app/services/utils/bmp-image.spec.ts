import { expect } from "chai";
import * as fs from "fs";
import { readLittleEndianBytes } from "./binary";
import { BMPImage } from "./bmp-image";
import { Pixel } from "./pixel";

/* tslint:disable:no-magic-numbers */
// tslint:disable:max-func-body-length
describe.only("bmp image", () => {
    let data: Uint8Array;

    const width: number = 640;
    const height: number = 480;

    before((done: Mocha.Func) => {
        fs.readFile("../client/src/assets/img/dog.bmp", (err: NodeJS.ErrnoException, fileData: Buffer) => {
            data = Uint8Array.from(fileData);
            setTimeout(done, 0);
        });
    });

    it("should serialize and deserialize properly", () => {
        const image: Uint8Array = data;
        const bmpImage: Uint8Array = BMPImage.fromArray(image).toArray();
        const lastPixel: number = 640 * 480 * 3 + readLittleEndianBytes(image, 4, 10);

        expect(bmpImage.slice(0, lastPixel)).to.deep.equal(image.slice(0, lastPixel));
    });

    it("should return the number of pixels in the image", () => {
        expect(BMPImage.fromArray(data).size()).to.be.equal(width * height);
    });

    it("should return a white pixel", () => {
        const WHITE_PIXEL: Pixel = Pixel.WHITE_PIXEL;
        expect(BMPImage.fromArray(data).pixelAt(0)).to.deep.equal(WHITE_PIXEL);
    });

    it("should return undefined when reading before index 0", () => {
        expect(BMPImage.fromArray(data).pixelAt(-1)).to.equal(undefined);
    });

    it("should return undefined when reading after the last pixel", () => {
        expect(BMPImage.fromArray(data).pixelAt(width * height + 1)).to.equal(undefined);
    });

    it("should recognize a bmp image", () => {
        expect(BMPImage.isBMP(data)).to.equal(true);
    });

    it("should rejects a non-bmp image", (done: Mocha.Func) => {
        fs.readFile("../client/src/assets/img/logo.png", (err: NodeJS.ErrnoException, fileData: Buffer) => {
            const png: Uint8Array = Uint8Array.from(fileData);
            expect(BMPImage.isBMP(png)).to.equal(false);
            setTimeout(done, 0);
        });
    });
});
