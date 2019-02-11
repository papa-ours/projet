import { expect } from "chai";
import { BMPImage } from "../../../common/images/bmp-image";
import { DifferenceImageGenerator } from "./difference-image-generator.service";

// tslint:disable:max-func-body-length
describe("Differences finder", () => {
    let differenceImageService: DifferenceImageGenerator;

    beforeEach(() => {
        differenceImageService = new DifferenceImageGenerator();
    });

    it("should return undefined if it is passed a non bmp image", () => {
        const data: Uint8Array = new Uint8Array([0, 0, 0, 0]);
        const result: BMPImage | undefined = differenceImageService.generate(data, data);

        expect(result).to.equals(undefined);
    });
});
