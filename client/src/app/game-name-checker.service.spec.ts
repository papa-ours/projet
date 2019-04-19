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
            providers: [GameNameCheckerService],
        });
        gameNameChecker = TestBed.get(GameNameCheckerService);
    });

});
