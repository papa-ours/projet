import { HttpClientTestingModule, HttpTestingController, TestRequest } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { GameFreeViewGenerationService } from './game-free-view-generation.service';

describe('GameFreeViewGenerationService', () => {
    let gameFreeViewGenerationService: GameFreeViewGenerationService;
    let httpMock: HttpTestingController;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [GameFreeViewGenerationService],
        });
        // tslint:disable-next-line:no-any
        gameFreeViewGenerationService = TestBed.get(GameFreeViewGenerationService);
        httpMock = TestBed.get(HttpTestingController);
    });

});
