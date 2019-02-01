import { UsernameValidationService } from "./username-validation-service.service";

describe("UsernameValidationServiceService", () => {
  let usernameValidationService: UsernameValidationService;
  beforeEach(() => {
    usernameValidationService = new UsernameValidationService();
  });
  it("should be created", () => {
    expect(usernameValidationService).toBeTruthy();
  });
});
