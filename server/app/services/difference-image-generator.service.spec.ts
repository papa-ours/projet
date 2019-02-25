import { expect } from "chai";
import { DifferenceImage } from "../../../common/images/difference-image";
import { DifferenceImageGenerator } from "./difference-image-generator.service";

describe("Difference Image Generator", () => {
    let differenceImageService: DifferenceImageGenerator;

    beforeEach(() => {
        differenceImageService = new DifferenceImageGenerator();
    });

    it("should return undefined if it is passed a non bmp original image", () => {
        differenceImageService.generateDifferenceImage("testing", ["test/car_test.jpg", "test/pringles-modifiedImage.bmp"])
            .catch((err: TypeError) => {

                expect(err.message).to.equals("L'image originale n'est pas de type BMP");
            });
    });

    it("should return undefined if it is passed a non bmp modified image", () => {
        differenceImageService.generateDifferenceImage("testing", ["test/pringles-originalImage.bmp", "test/car_test.jpg"])
            .catch((err: TypeError) => {

                expect(err.message).to.equals("L'image modifiée n'est pas de type BMP");
            });
    });

    it("should return undefined if the dimension of the original image is not 640px x 480px", () => {
        differenceImageService.generateDifferenceImage("testing", ["./test/blank_smallDimension.bmp", "test/pringles-modifiedImage.bmp"])
            .catch((err: SyntaxError) => {

                expect(err.message).to.equals("L'image originale n'est pas de dimension 640px x 480px");
            });
    });

    it("should return undefined if the dimension of the modified image is not 640px x 480px", () => {
        differenceImageService.generateDifferenceImage("testing", ["test/pringles-originalImage.bmp", "./test/blank_smallDimension.bmp"])
            .catch((err: SyntaxError) => {

                expect(err.message).to.equals("L'image modifiée n'est pas de dimension 640px x 480px");
            });
    });

    it("should return undefined if the original image is not in 24 bit format", () => {
        differenceImageService.generateDifferenceImage("testing", ["./test/car_original_32bit.bmp", "test/pringles-modifiedImage.bmp"])
            .catch((err: SyntaxError) => {

            expect(err.message).to.equals("L'image originale n'est pas en format 24 bit");
        });
    });

    it("should return undefined if the modified image is not in 24 bit format", () => {
        differenceImageService.generateDifferenceImage("testing", ["test/pringles-originalImage.bmp", "./test/car_original_32bit.bmp"])
            .catch((err: SyntaxError) => {

            expect(err.message).to.equals("L'image modifiée n'est pas en format 24 bit");
        });
    });

    it("should generate the difference image correctly", () => {
        differenceImageService.generateDifferenceImage(
            "testing",
            ["test/voiture-originalImage.bmp", "test/voiture-modifiedImage.bmp"],
        ).then((image: DifferenceImage) => {
            expect(image).not.to.equals(undefined);
        }).catch((err: Error) => {
            console.error(err);
        });
    });
});
