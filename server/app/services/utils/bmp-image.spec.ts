import { expect } from "chai";
import * as fs from "fs";
import { readLittleEndianBytes } from "../../../../common/images/binary";
import { BMPImage } from "../../../../common/images/bmp-image";
import { Pixel } from "../../../../common/images/pixel";

/* tslint:disable:no-magic-numbers */
describe("bmp image", () => {
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

    it("shouldn't modify an image if the index is out of bounds", () => {
        const image: BMPImage = BMPImage.fromArray(data);
        image.placePixel(-1, new Pixel(0x123456));
        expect(image).to.deep.equal(BMPImage.fromArray(data));
    });

    it("should modify an image if the index is valid", () => {
        const image: BMPImage = BMPImage.fromArray(data);
        image.placePixel(1, new Pixel(0x123456));
        expect(image).to.not.deep.equal(BMPImage.fromArray(data));
    });

    it("should return true if the image is format BMP 24 bit", () => {
        expect(BMPImage.isBitFormatValid(data)).to.equal(true);
    });

    it("should return false if the image is NOT format BMP 24 bit", (done: Mocha.Func) => {
        fs.readFile("./test/car_original_32bit.bmp", (err: NodeJS.ErrnoException, fileData: Buffer) => {
            const whiteImage: Uint8Array = Uint8Array.from(fileData);
            expect(BMPImage.isBitFormatValid(whiteImage)).to.equal(false);
            setTimeout(done, 0);
        });
    });

    it("should return true if the dimension is 640 x 480px", () => {
        expect(BMPImage.isDimensionValid(data)).to.be.equals(true);
    });

    it("should return false if the dimension is not 640 x 480px", (done: Mocha.Func) => {
        fs.readFile("./test/blank_smallDimension.bmp", (err: NodeJS.ErrnoException, fileData: Buffer) => {
            const image: Uint8Array = Uint8Array.from(fileData);
            expect(BMPImage.isDimensionValid(image)).to.equal(false);
            setTimeout(done, 0);
        });
    });

});
