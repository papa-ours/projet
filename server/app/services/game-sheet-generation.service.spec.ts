import { expect } from "chai";
import * as fs from "fs";
import { DBConnectionService } from "./dbconnection.service";
import { DifferenceImageGenerator } from "./difference-image-generator.service";
import { DifferencesFinderService } from "./differences-finder.service";
import { GameSheetGenerationService } from "./game-sheet-generation.service";

describe("game sheet generation", () => {
    let gameSheetGenerator: GameSheetGenerationService;

    beforeEach(() => {
        gameSheetGenerator = new GameSheetGenerationService(new DifferenceImageGenerator(),
                                                            new DifferencesFinderService(),
                                                            new DBConnectionService());
    });

    it("should return the correct error message if the images don't have 7 differences", () => {
        let imageData: Uint8Array;
        fs.readFile("../client/src/assets/img/dog.bmp", (err: NodeJS.ErrnoException, fileData: Buffer) => {
            imageData = Uint8Array.from(fileData);
            const result: string = gameSheetGenerator.generateGameSheet("", imageData, imageData).body;
            expect(result).to.equals("Les images n'ont pas exactement 7 différences, la création a été annulée");
        });
    });

    it("should return an empty body message if the images have 7 differences", () => {
        const originalImageBuffer: Buffer = fs.readFileSync("../client/src/assets/img/dog.bmp");
        const modifiedImageBuffer: Buffer = fs.readFileSync("../client/src/assets/img/dog_7_diff.bmp");

        const originalImageData: Uint8Array = Uint8Array.from(originalImageBuffer);
        const modifiedImageData: Uint8Array = Uint8Array.from(modifiedImageBuffer);

        const result: string = gameSheetGenerator.generateGameSheet("", originalImageData, modifiedImageData).body;
        expect(result).to.equals("");
    });

    it("should return a value between min and max", () => {
        const MIN: number = 10;
        const MAX: number = 14;
        const val: number = gameSheetGenerator.getNumberBetween(MIN, MAX);
        const result: boolean = (val <= MAX) && (val >= MIN);
        expect(result).to.equals(true);
    });

    it("should work even if min is greater than max", () => {
        const MIN: number = 12;
        const MAX: number = 20;
        const val: number = gameSheetGenerator.getNumberBetween(MAX, MIN);
        const result: boolean = (val <= MAX) && (val >= MIN);
        expect(result).to.equals(true);
    });

    it("should return usernames between 3 and 16 characters", () => {
        const MIN: number = 3;
        const MAX: number = 16;
        const username: string = gameSheetGenerator.makeUsername();
        const result: boolean = (username.length <= MAX) && (username.length >= MIN);
        expect(result).to.equals(true);
    });
});
