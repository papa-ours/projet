import { expect } from "chai";
import { RandomNumber } from "./random-number";

describe("RandomNumber", () => {
    const max: number = 10;
    const min: number = 0;

    it("should generate a random number in range as specified", () => {

        expect(RandomNumber.randomInteger(min, max)).to.be.below(max).and.to.be.above(min);
    });

});
