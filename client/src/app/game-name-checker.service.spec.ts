import { GameNameChecker } from "./game-name-checker.service";
import { TestBed } from "@angular/core/testing";

describe("GameNameChecker", () => {
    let gameNameChecker: GameNameChecker;
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [GameNameChecker],
        });
        gameNameChecker = TestBed.get(GameNameChecker);
    });

});
