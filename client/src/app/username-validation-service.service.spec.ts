import { TestBed } from "@angular/core/testing";

import { UsernameValidationService } from "./username-validation-service.service";

describe("UsernameValidationServiceService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: UsernameValidationService = TestBed.get(UsernameValidationService);
    expect(service).toBeTruthy();
  });
});
