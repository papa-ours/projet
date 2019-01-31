import { expect } from "chai";
import * as fs from "fs";
import { readLittleEndianBytes } from "./binary";
import { BMPImage } from "./bmp-image";
import { Pixel } from "./pixel";

/* tslint:disable:no-magic-numbers */
describe.only("bmp image", () => {
    let data: Uint8Array;
    beforeEach((done: Mocha.Func) => {
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
        expect(BMPImage.fromArray(data).size()).to.be.equal(640 * 480);
    });

    it ("should return a white pixel", () => {
        const WHITE_PIXEL: Pixel = new Pixel(0xFFFFFF);
        expect(BMPImage.fromArray(data).pixelAt(0)).to.deep.equal(WHITE_PIXEL);
    });

});
