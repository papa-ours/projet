import {HttpClientTestingModule , HttpTestingController, TestRequest} from "@angular/common/http/testing"
import { TestBed } from "@angular/core/testing";
import { Message } from "../../../common/communication/message";
import { DifferenceImageService } from "./difference-image.service";

describe("DifferenceImageService", () => {
  let  differenceImageService: DifferenceImageService;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [DifferenceImageService],
    });
    // tslint:disable-next-line:no-any
    differenceImageService = TestBed.get(DifferenceImageService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it("should be created", () => {
    expect(differenceImageService).toBeTruthy();
  });

  it("should be a POST REQUEST", () => {
    const response: Message = {
      title: "this is the title",
      body: "this is the body",
    };
    differenceImageService.postDifferenceImageData(new FormData()).subscribe(
      (data: Message) => { expect(data).toBeDefined(); },
    );
    const request: TestRequest = httpMock.expectOne(`${differenceImageService.URL}`);
    expect(request.request.method).toBe("POST");
    request.flush(response);
  });

  it("should return a proper message body on POST request", () => {
    const response: Message = {
      title: "this is the title",
      body: "this is the body",
    };
    differenceImageService.postDifferenceImageData(new FormData()).subscribe(
      (data: Message) => { expect(data.body).toBe(response.body); },
   );
    const request: TestRequest = httpMock.expectOne(`${differenceImageService.URL}`);
    request.flush(response);
    expect(request.request.method).toBe("POST");
  });
  it("should return a proper message title on POST request", () => {
    const response: Message = {
      title: "this is the title",
      body: "this is the body",
    };
    differenceImageService.postDifferenceImageData(new FormData()).subscribe(
      (data: Message) => { expect(data.title).toBe(response.title); },
   );
    const request: TestRequest = httpMock.expectOne(`${differenceImageService.URL}`);
    request.flush(response);
    expect(request.request.method).toBe("POST");
  });
});
