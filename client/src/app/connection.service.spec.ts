import { HttpClientTestingModule, HttpTestingController, TestRequest } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { ConnectionService } from "./connection.service";

describe("ConnectionService", () => {
    let connectionService: ConnectionService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [ConnectionService],
        });
        connectionService = TestBed.get(ConnectionService);
        httpMock = TestBed.get(HttpTestingController);
    });

    it("should be created", () => {
        expect(connectionService).toBeTruthy();
    });

    it("should return a validation string", () => {
        connectionService.getUsernameValidation("name")
            .subscribe((data: string) => expect(data).toBeDefined());
    });

    it("should be a POST REQUEST", () => {
        const request: TestRequest = httpMock.expectOne(`${connectionService.BASE_URL}name`);
        expect(request.request.method).toBe("POST");
        httpMock.verify();
    });

    it("should be a DELETE REQUEST", () => {
        const request: TestRequest = httpMock.expectOne(`${connectionService.BASE_URL}delete/name`);
        expect(request.request.method).toBe("DELETE");
        httpMock.verify();
    });
});
