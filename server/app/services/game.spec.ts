import { expect } from "chai";
import * as fs from "fs";
import { DifferenceImageGenerator } from "./difference-image-generator.service";
import { Game } from "./game";
import { Position } from "./utils/circle-area";
import { DifferenceImage } from "./utils/difference-image";

describe("Game", () => {
    const originalImage: Uint8Array = Uint8Array.from(fs.readFileSync("../client/src/assets/img/car_original.bmp"));
    const modifiedImage: Uint8Array = Uint8Array.from(fs.readFileSync("../client/src/assets/img/car_modified.bmp"));

    const differenceImageGenerator: DifferenceImageGenerator = new DifferenceImageGenerator();
    const differenceImage: DifferenceImage = differenceImageGenerator.generate(originalImage, modifiedImage) as DifferenceImage;

    const game: Game = new Game("0", originalImage, modifiedImage, differenceImage);
    it("should restore the difference like the original image", () => {
        // tslint:disable:no-magic-numbers
        game.restoreModifiedImage(468, 333);
        const position: Position = {i: 468, j: 333};
        const index: number = game.originalImage.getIndex(position);
        expect(game.originalImage.pixelAt(index)).to.equal(game.modifiedImage.pixelAt(index));
    });
    it("should not restore something in the modified image if not a difference", () => {
        // tslint:disable:no-magic-numbers
        game.restoreModifiedImage(0, 0);
        const position: Position = {i: 0, j: 0};
        const index: number = game.originalImage.getIndex(position);
        expect(game.originalImage.pixelAt(index)).to.deep.equal(game.modifiedImage.pixelAt(index));
    });
});
