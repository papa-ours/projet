import { TestBed } from "@angular/core/testing";
import { HttpClientTestingModule, HttpTestingController, TestRequest } from "@angular/common/http/testing";
import { GetSceneDataService } from "./get-scene-data.service";
import { SceneData } from "../../../../common/communication/geometry";

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
});
