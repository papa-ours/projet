import { HttpClientTestingModule, HttpTestingController, TestRequest } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { ConnectionService } from "./connection.service";
import { DifferenceCheckerService } from "./difference-checker.service";

describe("DifferenceCheckerService", () => {
    let differenceCheckerService: DifferenceCheckerService;
    let httpMock: HttpTestingController;
    let connectionService: ConnectionService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [DifferenceCheckerService, ConnectionService],
        });
        connectionService = TestBed.get(ConnectionService);
        differenceCheckerService = TestBed.get(DifferenceCheckerService);
        httpMock = TestBed.get(HttpTestingController);
    });

    it("should be created", () => {
        expect(differenceCheckerService).toBeTruthy();
    });

    it("should be a GET REQUEST", () => {
        differenceCheckerService.isPositionDifference("0", 0, 0)
            .subscribe(async (data: boolean) => expect(data).toBeDefined());
        const request: TestRequest = httpMock.expectOne(`${differenceCheckerService.BASE_URL}/0/0/480/${connectionService.username}`);
        expect(request.request.method).toBe("GET");
        httpMock.verify();
    });

    it("should return a JSON", () => {
        differenceCheckerService.isPositionDifference("0", 0, 0)
            .subscribe(async (data: boolean) => expect(data).toBeDefined());
        const request: TestRequest = httpMock.expectOne(`${differenceCheckerService.BASE_URL}/0/0/480/${connectionService.username}`);
        expect(request.request.responseType).toBe("json");
        httpMock.verify();
    });
});
