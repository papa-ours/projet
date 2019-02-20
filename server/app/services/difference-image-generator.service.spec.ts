import { expect } from "chai";
import { DifferenceImage } from "../../../common/images/difference-image";
import { DifferenceImageGenerator } from "./difference-image-generator.service";

// tslint:disable:max-func-body-length
describe.only("Difference Image Generator", () => {
    let differenceImageService: DifferenceImageGenerator;

    beforeEach(() => {
        differenceImageService = new DifferenceImageGenerator();
    });

    it("should return undefined if it is passed a non bmp original image", () => {
        differenceImageService.generateDifferenceImage("testing", ["assets/car_test.jpg", "assets/pringles-modifiedImage.bmp"])
            .catch((err: Error) => {
                expect(err.message).to.equals("L'image originale n'est pas de type BMP");
            });

    });

    it("should return undefined if it is passed a non bmp modified image", () => {
        differenceImageService.generateDifferenceImage("testing", ["assets/pringles-originalImage.bmp", "assets/car_test.jpg"])
            .catch((err: Error) => {
                expect(err.message).to.equals("L'image modifiée n'est pas de type BMP");
            });
    });

    it("should return undefined if the dimension of the original image is not 640px x 480px", () => {
        differenceImageService.generateDifferenceImage("testing", ["./test/blank_smallDimension.bmp", "assets/pringles-modifiedImage.bmp"])
            .catch((err: Error) => {
                expect(err.message).to.equals("L'image originale n'est pas de dimension 640px x 480px");
            });
    });

    it("should return undefined if the dimension of the modified image is not 640px x 480px", () => {
        differenceImageService.generateDifferenceImage("testing", ["assets/pringles-originalImage.bmp", "./test/blank_smallDimension.bmp"])
            .catch((err: Error) => {
                expect(err.message).to.equals("L'image modifiée n'est pas de dimension 640px x 480px");
            });
    });

    it("should generate the difference image correctly", () => {
        differenceImageService.generateDifferenceImage(
            "testing",
            ["assets/voiture-originalImage.bmp", "assets/voiture-modifiedImage.bmp"])
                .then((image: DifferenceImage) => {
                    expect(image).not.to.equals(undefined);
                });
    });
});
