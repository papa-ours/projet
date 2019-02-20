import { expect } from "chai";
import { Game } from "./game";
import { Position } from "./utils/circle-area";

// tslint:disable:no-magic-numbers
describe("Game", () => {
    const game: Game = new Game("0", "voiture");
    const ONE_SECOND: number = 1000;
    it("should restore the difference like the original image", () => {
        setTimeout(
            () => {
                const x: number = 35;
                const y: number = 193;
                game.restoreModifiedImage(x, y);
                const position: Position = {i: x, j: y };
                const index: number = game.images[0].getIndex(position);
                expect(game.images[0].pixelAt(index)).to.equals(game.images[1].pixelAt(index));
            },
            ONE_SECOND);
    });
    it("should not restore something in the modified image if not a difference", () => {
        setTimeout(
            () => {
                game.restoreModifiedImage(0, 0);
                const position: Position = {i: 0, j: 0};
                const index: number = game.images[0].getIndex(position);
                expect(game.images[0].pixelAt(index)).to.deep.equal(game.images[1].pixelAt(index));
            },
            ONE_SECOND);
    });
});
// tslint:enable:no-mage-numbers
