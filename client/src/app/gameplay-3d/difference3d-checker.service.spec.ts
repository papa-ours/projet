import { HttpClientTestingModule, HttpTestingController, TestRequest } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { GeometryData } from "../../../../common/communication/geometry";
import { Message, MessageType } from "../../../../common/communication/message";
import { VectorInterface } from "../../../../common/communication/vector-interface";
import { ConnectionService } from "../connection.service";
import { Difference3DCheckerService } from "./difference3d-checker.service";

describe("Difference3DCheckerService", () => {
    let differenceCheckerService: Difference3DCheckerService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [Difference3DCheckerService, ConnectionService],
        });
        differenceCheckerService = TestBed.get(Difference3DCheckerService);
        httpMock = TestBed.get(HttpTestingController);
    });

    it("should be created", () => {
        expect(differenceCheckerService).toBeTruthy();
    });

    it("should be a POST REQUEST that returns a boolean value on isPositionDifference", () => {
        const response: Message = {
            type: MessageType.SCENE_DATA,
            body: "true",
        };
        const position: VectorInterface = { x: 0, y: 0, z: 0 };
        differenceCheckerService.isPositionDifference(position, "test").subscribe(
            (value: boolean) => { expect(value).toBeTruthy(); },
        );
        const request: TestRequest = httpMock.expectOne(`${differenceCheckerService.URL}`);
        expect(request.request.method).toBe("POST");
        request.flush(response);
    });

    it("should be a POST REQUEST that returns a data set of geometry on getAllDifferences", () => {
        const result: GeometryData[] = [{
            color: 0xFFFFFF,
            size: 10,
            rotation: { x: 0, y: 0, z: 0 },
            position: { x: 0, y: 0, z: 0 },
            isModified: false,
            type: 0,
        }];
        const response: Message = {
            type: MessageType.SCENE_DATA,
            body: JSON.stringify(result),
        };
        differenceCheckerService.getAllDifference("test").subscribe(
            (value: GeometryData[]) => { expect(value).toBeDefined(); },
        );
        const request: TestRequest = httpMock.expectOne(`${differenceCheckerService.URL}/differences`);
        expect(request.request.method).toBe("POST");
        request.flush(response);
    });
});
