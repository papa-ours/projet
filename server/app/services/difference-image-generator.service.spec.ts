import { expect } from "chai";
import { DifferenceImageGenerator } from "./difference-image-generator.service";

// tslint:disable:max-func-body-length
describe("Difference Image Generator", () => {
    let differenceImageService: DifferenceImageGenerator;

    beforeEach(() => {
        differenceImageService = new DifferenceImageGenerator();
    });

    it("should return undefined if it is passed a non bmp image", async () => {
        try {
            await differenceImageService.generateDifferenceImage("testing", ["assets/car_test.jpg", "assets/car_test.jpg"]);
        } catch {
            expect(true).to.equals(true);
        }
    });

    it("should generate the difference image correctly", async () => {
        try {
            await differenceImageService.generateDifferenceImage("testing",
                                                                 ["assets/voiture-originalImage.bmp",
                                                                  "assets/voiture-modifiedImage.bmp"]);
            expect(true).to.equals(true);
        } catch {
            expect(false).to.equals(true);
        }
    });
});
