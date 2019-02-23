import { HttpClientTestingModule, HttpTestingController, TestRequest } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { DifferenceCheckerService } from "./difference-checker.service";

describe("DifferenceCheckerService", () => {
    let differenceCheckerService: DifferenceCheckerService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [DifferenceCheckerService],
        });
        differenceCheckerService = TestBed.get(DifferenceCheckerService);
        httpMock = TestBed.get(HttpTestingController);
    });

    it("should be created", () => {
        expect(differenceCheckerService).toBeTruthy();
    });

    it("should be a GET REQUEST", () => {
        differenceCheckerService.isPositionDifference("0", 0, 0)
            .subscribe((data: boolean) => expect(data).toBeDefined());
        const request: TestRequest = httpMock.expectOne(`${differenceCheckerService.BASE_URL}0/0/0`);
        expect(request.request.method).toBe("GET");
        httpMock.verify();
    });
});
