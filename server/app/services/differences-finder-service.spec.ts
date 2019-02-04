import { expect } from "chai";
import * as fs from "fs";
import { DifferencesFinderService } from "./differences-finder.service";
import { BMPImage } from "./utils/bmp-image";
import { Pixel } from "./utils/pixel";

// tslint:disable:no-magic-numbers
describe("Differences finder", () => {
    let differencesFinder: DifferencesFinderService;

    beforeEach(() => {
        differencesFinder = new DifferencesFinderService();
    });

    const blank: BMPImage = BMPImage.fromArray(fs.readFileSync("./test/blank.bmp"));
    const text: BMPImage = BMPImage.fromArray(fs.readFileSync("./test/image-difference-test.bmp"));

    it("should throw an error if it is passed undefined", () => {
        // @ts-ignore
        // tslint:disable-next-line:prefer-const
        let image: BMPImage;
        // @ts-ignore
        expect(differencesFinder.getNumberOfDifferences.bind(image)).to.throw("Image must be defined");
    });

    it("should return 1 if it is passed an image with two black pixels", () => {
        const header: Uint8Array = new Uint8Array(0);
        const pixels: Pixel[] = [Pixel.BLACK_PIXEL, Pixel.BLACK_PIXEL];
        const image: BMPImage = new BMPImage(pixels, header, pixels.length, 1);
        const result: number = differencesFinder.getNumberOfDifferences(image);

        expect(result).to.equals(1);
    });

    it("should return 1 if it is passed an image with one black pixel and one white pixel", () => {
        const header: Uint8Array = new Uint8Array(0);
        const pixels: Pixel[] = [Pixel.WHITE_PIXEL, Pixel.BLACK_PIXEL];
        const image: BMPImage = new BMPImage(pixels, header, pixels.length, 1);
        const result: number = differencesFinder.getNumberOfDifferences(image);

        expect(result).to.equals(1);
    });

    it("should return 1 if it is passed an image with one black pixel", () => {
        const header: Uint8Array = new Uint8Array(0);
        const pixels: Pixel[] = [Pixel.BLACK_PIXEL];
        const image: BMPImage = new BMPImage(pixels, header, pixels.length, 1);
        const result: number = differencesFinder.getNumberOfDifferences(image);

        expect(result).to.equals(1);
    });

    it("should return 2 if it is passed an image with two seperated black pixels", () => {
        const header: Uint8Array = new Uint8Array(0);
        const pixels: Pixel[] = [Pixel.BLACK_PIXEL, Pixel.WHITE_PIXEL, Pixel.BLACK_PIXEL, Pixel.WHITE_PIXEL];
        const image: BMPImage = new BMPImage(pixels, header, pixels.length, 1);
        const result: number = differencesFinder.getNumberOfDifferences(image);

        expect(result).to.equals(2);
    });

    it("should return 0 if it is passed an image with one white pixel", () => {
        const header: Uint8Array = new Uint8Array(0);
        const pixels: Pixel[] = [Pixel.WHITE_PIXEL];
        const image: BMPImage = new BMPImage(pixels, header, 1, 1);
        const result: number = differencesFinder.getNumberOfDifferences(image);

        expect(result).to.equals(0);
    });

    it("should count the number of contiguous black regions in an image", () => {
        const difference: BMPImage = text.compare(blank);
        difference.augmentBlackPixels();
        const count: number = differencesFinder.getNumberOfDifferences(difference);
        expect(count).to.equal(1);
    });

});
