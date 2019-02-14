import { expect } from "chai";
import { BMPImage } from "../../../common/images/bmp-image";
import { DifferenceImageGenerator } from "./difference-image-generator.service";

// tslint:disable:max-func-body-length
describe("Difference Image Generator", () => {
    let differenceImageService: DifferenceImageGenerator;

    beforeEach(() => {
        differenceImageService = new DifferenceImageGenerator();
    });

    it("should return undefined if it is passed a non bmp image", async () => {
        const result: BMPImage | undefined = await differenceImageService
                                                        .generateDifferenceImage("testing", ["assets/car_test.jpg", "assets/car_test.jpg"]);

        expect(result).to.equals(undefined);
    });

    it("should generate the difference image correctly", async () => {
        const result: BMPImage | undefined = await differenceImageService
                                                        .generateDifferenceImage("testing",
                                                                                 ["assets/voiture-originalImage.bmp",
                                                                                  "assets/voiture-modifiedImage.bmp"]);

        expect(result).not.to.equals(undefined);
    });
});
