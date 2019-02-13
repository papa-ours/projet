import { expect } from "chai";
import * as fs from "fs";
import { GameSheetDescription, TopScoresInterface } from "../../../common/communication/game-description";
import { BMPImage } from "../../../common/images/bmp-image";
import { DifferenceImage } from "../../../common/images/difference-image";
import { DifferenceImageGenerator } from "./difference-image-generator.service";
import { Game } from "./game";
import { GetGameService } from "./get-game.service";

describe("GetGameService", () => {

    let getGameService: GetGameService;
    const originalImage: Uint8Array = Uint8Array.from(fs.readFileSync("../client/src/assets/img/car_original.bmp"));
    const modifiedImage: Uint8Array = Uint8Array.from(fs.readFileSync("../client/src/assets/img/car_modified.bmp"));
    const differenceImageGenerator: DifferenceImageGenerator = new DifferenceImageGenerator();
    const differenceImage: DifferenceImage = differenceImageGenerator.generate(originalImage, modifiedImage) as DifferenceImage;
    const carID: string = "0";
    const game: Game = new Game(carID, originalImage, modifiedImage, differenceImage);
    const topScoreInterface: TopScoresInterface[] = [];
    const preview: string = originalImage.toString() + modifiedImage.toString();
    const gameSheetDescription: GameSheetDescription = {id: carID, name: "car", preview: preview, topScores: topScoreInterface};

    beforeEach(() => {
        getGameService = new GetGameService();
    });

    it("should return undefined if there's no corresponding id", () => {
        const id: string = "1";
        expect(getGameService.getGame(id)).to.equal(undefined);
    });

    it("should return the GameSheetDescription properly if it's empty", () => {
        const expected: GameSheetDescription[] = [];
        const resultat: GameSheetDescription[] = getGameService.getGameDescriptions();
        expect(resultat).to.deep.equal(expected);
    });

    it("should add the game in the GameService properly", () => {
        getGameService.addGame(gameSheetDescription, game);
        expect(getGameService.getGame(carID)).to.equal(game);
    });

    it("should return the game images", () => {
        const expected: string[] = [BMPImage.fromArray(originalImage).toArray().toString(),
                                    BMPImage.fromArray(modifiedImage).toArray().toString()];
        const result: string[] = getGameService.getGameImages(carID);
        expect(result).to.deep.equal(expected);
    });

    it("should return an empty string is there'is no corresponding id", () => {
        const id: string = "1";
        const expected: string[] = [];
        const result: string[] = getGameService.getGameImages(id);
        expect(result).to.deep.equal(expected);
    });

    it("should return the GameSheetDescription properly", () => {
        const expected: GameSheetDescription[] = [gameSheetDescription];
        const resultat: GameSheetDescription[] = getGameService.getGameDescriptions();
        expect(resultat).to.deep.equal(expected);
    });
});
