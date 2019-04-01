import { HttpClientTestingModule, HttpTestingController, TestRequest } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { Message, MessageType } from "../../../common/communication/message";
import { GameFreeViewGenerationService } from "./game-free-view-generation.service";

describe("GameFreeViewGenerationService", () => {
    let gameFreeViewGenerationService: GameFreeViewGenerationService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [GameFreeViewGenerationService],
        });
        gameFreeViewGenerationService = TestBed.get(GameFreeViewGenerationService);
        httpMock = TestBed.get(HttpTestingController);
    });

    it("should be a POST REQUEST", () => {
        const response: Message = {
            type: MessageType.GAME_SHEET_GENERATION,
            body: "this is the body",
        };
        const formData: FormData = new FormData();
        formData.append("objectType", "test");
        gameFreeViewGenerationService.postGenerate(formData).catch((err: Error) => {
            fail(err);
        });
        const request: TestRequest = httpMock.expectOne(`${gameFreeViewGenerationService.URL}${formData.get("objectType")}`);
        expect(request.request.method).toBe("POST");
        request.flush(response);
        httpMock.verify();
    });

});
