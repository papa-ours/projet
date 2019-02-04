import { HttpErrorResponse } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { defer } from "rxjs";
import { GameListService } from "./game-list-getter.service";

describe("GameListGetterService", () => {
    let httpClientSpy: { get: jasmine.Spy };
    let gameListService: GameListService;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpErrorResponse, defer],
            providers: [GameListService],
        });
        httpClientSpy = jasmine.createSpyObj("HttpClient", ["get"]);
        // tslint:disable-next-line:no-any
        gameListService = new GameListService(httpClientSpy as any);
    });

    it("should be created", () => {
        expect(gameListService).toBeTruthy();
    });
    it("should return an error when the server returns a 404", () => {
        const errorResponse: HttpErrorResponse = new HttpErrorResponse({
            error: "404 Not Found",
            status: 404, statusText: "Not Found",
        });

        httpClientSpy.get.and.returnValue(defer(async () => Promise.reject(errorResponse).then(
            (err: Error) => {
                console.error(err);
        })));

        gameListService.getGameList().subscribe(
            (list) => fail(`expected an error, not a list : ${list}`),
            (error) => expect(error.message).toContain("404 Not Found"),
        );
    });
});
