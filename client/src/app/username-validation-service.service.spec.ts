import { HttpClientTestingModule, HttpTestingController, TestRequest } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { UsernameValidationService } from "./username-validation-service.service";

describe("UsernameValidationService", () => {
    let usernameValidationService: UsernameValidationService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [UsernameValidationService],
        });
        usernameValidationService = TestBed.get(UsernameValidationService);
        httpMock = TestBed.get(HttpTestingController);
    });

    it("should be created", () => {
        expect(usernameValidationService).toBeTruthy();
    });

    it("should return a validation string", () => {
        usernameValidationService.getUsernameValidation("name")
            .subscribe((data: string) => expect(data).toBeDefined());
    });

    it("should be a POST REQUEST", () => {
        const request: TestRequest = httpMock.expectOne(`${usernameValidationService.BASE_URL}name`);
        expect(request.request.method).toBe("POST");
        httpMock.verify();
    });

    it("should be a DELETE REQUEST", () => {
        const request: TestRequest = httpMock.expectOne(`${usernameValidationService.BASE_URL}delete/name`);
        expect(request.request.method).toBe("DELETE");
        httpMock.verify();
    });
});
