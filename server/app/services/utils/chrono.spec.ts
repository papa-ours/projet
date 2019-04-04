import { expect } from "chai";
import { Chrono } from "./chrono";
describe("chrono", () => {
    const chrono: Chrono = new Chrono();
    it("should return a positive time ", () => {
        chrono.start();
        expect(chrono.time).to.be.gte(0);
    });
});
