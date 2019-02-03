import { FormValidationService } from "./form-validation.service";

describe("FormValidationService", () => {
  beforeEach(() => {});
  const formValidationService: FormValidationService = new FormValidationService();
  it("should be created", () => {
    expect(formValidationService).toBeTruthy();
  });
  it("should return false with an empty name ", () => {
    const name: string = "";
    expect(formValidationService.validateName(name)).toBeFalsy();
  });
  it("should return false with a short name", () => {
    const name: string = "ABC";
    expect(formValidationService.validateName(name)).toBeFalsy();
  });
  it("should return false with a name length greater than 15 characteres", () => {
    const name: string = "ABCDEFGHIJKLMNOP";
    expect(formValidationService.validateName(name)).toBeFalsy();
  });
  it("should return true with a name length beetween 5 and 15 characteres", () => {
    const name: string = "Hello";
    expect(formValidationService.validateName(name)).toBeTruthy();
  });
  it("should return true with a name length beetween 5 and 15 characteres", () => {
    const name: string = "Hello world!!!!";
    expect(formValidationService.validateName(name)).toBeTruthy();
  });
  it("should return false if it's not a bitmap image", () => {
    const file: File = new File([""], "./assets/img/logo.png");
    const name: string = "Hello";
    expect(formValidationService.isFormValid(name, file, file)).toBeFalsy();
  });
  it("should return true if it's bitmap image", () => {
    const file: File = new File([""], "./assets/img/dog.bmp");
    const name: string = "Hello";
    expect(formValidationService.isFormValid(name, file, file)).toBeFalsy();
  });
});
