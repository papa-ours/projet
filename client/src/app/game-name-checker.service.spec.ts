import { GameNameCheckerService } from "./game-name-checker.service";
import { TestBed } from "@angular/core/testing";
import { of, Observable } from "rxjs";
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
        expect(gameNameChecker.checkName("test2d", GameType.Simple)).toBeTruthy;
        gameNameChecker.initialize(GameType.Free);
        expect(gameNameChecker.checkName("test3d", GameType.Free)).toBeTruthy;
    });
    it("should return false if there is a duplicate in the other list", () => {
        gameNameChecker.initialize(GameType.Simple);
        expect(gameNameChecker.checkName("test3d", GameType.Simple)).toBeFalsy;
        gameNameChecker.initialize(GameType.Free);
        expect(gameNameChecker.checkName("test2d", GameType.Free)).toBeFalsy;
    });
});
