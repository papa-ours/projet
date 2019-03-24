import { HttpClientTestingModule, HttpTestingController, TestRequest } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { Difference3DCheckerService } from "./difference3d-checker.service";

describe("Difference3DCheckerService", () => {
    let differenceCheckerService: Difference3DCheckerService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [Difference3DCheckerService],
        });
        differenceCheckerService = TestBed.get(Difference3DCheckerService);
        httpMock = TestBed.get(HttpTestingController);
    });

    it("should be created", () => {
        expect(differenceCheckerService).toBeTruthy();
    });
});
