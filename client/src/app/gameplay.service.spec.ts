import { HttpClientTestingModule, HttpTestingController, TestRequest } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { GameplayService } from "./gameplay.service";

describe("GameplayService", () => {
    let gameplayService: GameplayService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [GameplayService],
        });
        gameplayService = TestBed.get(GameplayService);
        httpMock = TestBed.get(HttpTestingController);
    });

    it("should be created", () => {
        expect(gameplayService).toBeTruthy();
    });

    it("should be a GET REQUEST", () => {
        gameplayService.getGameId("0").subscribe(
            (data: string) => { expect(data).toBeDefined();
        });
        const request: TestRequest = httpMock.expectOne(`${gameplayService.URL + "0"}`);
        expect(request.request.method).toBe("GET");
        httpMock.verify();
    });
});
