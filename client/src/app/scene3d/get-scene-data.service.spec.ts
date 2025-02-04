import { HttpClientTestingModule, HttpTestingController, TestRequest } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { SceneData } from "../../../../common/communication/geometry";
import { GetSceneDataService } from "./get-scene-data.service";

describe("GetSceneDataService", () => {
    let getSceneDataService: GetSceneDataService;
    let httpMock: HttpTestingController;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [GetSceneDataService],
        });
        getSceneDataService = TestBed.get(GetSceneDataService);
        httpMock = TestBed.get(HttpTestingController);
    });

    it("should be created", () => {
        const service: GetSceneDataService = TestBed.get(GetSceneDataService);
        expect(service).toBeTruthy();
    });

    it("should have a valid URL", () => {
        getSceneDataService.getSceneData("Test", false)
            .subscribe((data: SceneData) => expect(data).toBeDefined());
        httpMock.expectOne(`${getSceneDataService.URL}/Test-data.txt`);
    });

    it("should be a GET Request", () => {
        getSceneDataService.getSceneData("Test", false)
            .subscribe((data: SceneData) => expect(data).toBeDefined());
        const request: TestRequest = httpMock.expectOne(`${getSceneDataService.URL}/Test-data.txt`);
        expect(request.request.method).toBe("GET");
    });
});
