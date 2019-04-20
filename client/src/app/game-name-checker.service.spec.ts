import { TestBed } from "@angular/core/testing";
import { of, Observable } from "rxjs";
import { GameLists, GameSheet, GameType } from "../../../common/communication/game-description";
import { GameListService } from "./game-list-getter.service";
import { GameNameCheckerService } from "./game-name-checker.service";

// Declaration de stub, mais donne erreur tslint
// tslint:disable-next-line: typedef
const gameListServiceStub = {
    getGameList(): Observable<GameLists> {
        const gameList2d: GameSheet[] = [
            {
                id: "1",
                name: "test2d",
                topScores: [
                    { scoresStrings: ["1"] },
                    { scoresStrings: ["2"] },
                ],
            },
        ];
        const gameList3d: GameSheet[] = [
            {
                id: "1",
                name: "test3d",
                topScores: [
                    { scoresStrings: ["1"] },
                    { scoresStrings: ["2"] },
                ],
            },
        ];
        const gameList: GameLists = { list2d: gameList2d, list3d: gameList3d };

        return of( gameList );
    },
  };
describe("GameNameChecker", () => {
    let gameNameChecker: GameNameCheckerService;
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [GameNameCheckerService, {provide: GameListService, useValue: gameListServiceStub}],
        });
        gameNameChecker = TestBed.get(GameNameCheckerService);
    });
    it("should get the right gameList", () => {
        gameNameChecker.initialize(GameType.Simple);
        const namesTestSimple: string[] = gameNameChecker["names"];
        expect(namesTestSimple[0]).toBe("test2d");
        gameNameChecker.initialize(GameType.Free);
        const namesTestFree: string[] = gameNameChecker["names"];
        expect(namesTestFree[0]).toBe("test3d");
    });

    it("should return true if there is a duplicate in the correct list", () => {
        gameNameChecker.initialize(GameType.Simple);
        expect(gameNameChecker.checkName("test2d")).toBeTruthy();
        gameNameChecker.initialize(GameType.Free);
        expect(gameNameChecker.checkName("test3d")).toBeTruthy();
    });
    it("should return false if there is a duplicate in the other list", () => {
        gameNameChecker.initialize(GameType.Simple);
        expect(gameNameChecker.checkName("test3d")).toBeFalsy();
        gameNameChecker.initialize(GameType.Free);
        expect(gameNameChecker.checkName("test2d")).toBeFalsy();
    });
    it("should return false if it is not in any lists", () => {
        gameNameChecker.initialize(GameType.Simple);
        expect(gameNameChecker.checkName("")).toBeFalsy();
        gameNameChecker.initialize(GameType.Free);
        expect(gameNameChecker.checkName("")).toBeFalsy();
    });
});
