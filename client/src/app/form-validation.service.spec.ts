import { FormValidationService } from "./form-validation.service";

describe("FormValidationService", () => {
  const formValidationService: FormValidationService = new FormValidationService();
  it("should be created", () => {
    expect(formValidationService).toBeTruthy();
  });
  it("should return false with an empty name ", () => {
    const name: string = "";
    const file: File = new File([""], "./assets/img/dog.bmp", { lastModified: 1 , type: "image/bmp"});
    expect(formValidationService.isFormValid(name, file, file)).toBeFalsy();
  });
  it("should return false with a short name", () => {
    const file: File = new File([""], "./assets/img/dog.bmp", { lastModified: 1 , type: "image/bmp"});
    const name: string = "ABC";
    expect(formValidationService.isFormValid(name, file, file)).toBeFalsy();
  });
  it("should return false with a name length greater than 15 characteres", () => {
    const file: File = new File([""], "./assets/img/dog.bmp", { lastModified: 1 , type: "image/bmp"});
    const name: string = "ABCDEFGHIJKLMNOP";
    expect(formValidationService.isFormValid(name, file, file)).toBeFalsy();
  });
  it("should return true with a name length beetween 5 and 15 characteres", () => {
    const file: File = new File([""], "./assets/img/dog.bmp", { lastModified: 1 , type: "image/bmp"});
    const name: string = "Hello";
    expect(formValidationService.isFormValid(name, file, file)).toBeTruthy();
  });
  it("should return true with a name length beetween 5 and 15 characteres", () => {
    const file: File = new File([""], "./assets/img/dog.bmp", { lastModified: 1 , type: "image/bmp"});
    const name: string = "Hello world!!!!";
    expect(formValidationService.isFormValid(name, file, file)).toBeTruthy();
  });
  it("should return an error if both files are not a bitmap image", () => {
    const file: File = new File([""], "./assets/img/logo.png", { lastModified: 1 , type: "image/png"});
    const name: string = "Hello";
    expect(() => formValidationService.isFormValid(name, file, file))
    .toThrow(new Error("Les fichiers doivent etre dans le format Bitmap (.bmp)"));
  });
  it("should throw an error if one of both files is not a bitmap image", () => {
    const file1: File = new File([""], "./assets/img/dog.bmp", { lastModified: 1 , type: "image/bmp"});
    const file2: File = new File([""], "./assets/img/logo.png", { lastModified: 1 , type: "image/png"});
    const name: string = "Hello";
    expect(() => formValidationService.isFormValid(name, file1, file2))
    .toThrow(new Error("Les fichiers doivent etre dans le format Bitmap (.bmp)"));
  });
  it("should throw an error if the format is not 640px by 480px", () => {
    // tslint:disable-next-line:no-magic-numbers
    const image: Uint8Array = new Uint8Array([66, 77, 58, 254, 5, 0, 0, 0, 0, 0, 54, 4, 0, 0, 40, 0,
                                            // tslint:disable-next-line:no-magic-numbers
                                              0, 0, 48, 0, 0, 0, 39, 0, 0, 0, 1, 0, 8, 0, 0, 0, 0, 0,
                                            // tslint:disable-next-line:no-magic-numbers
                                              4, 250, 5, 0, 19, 11, 0, 0, 19, 11, 0, 0, 0, 0]);
    expect(() => formValidationService.isImageDimensionValid(image))
    .toThrow(new Error("Les images doivent être 640px par 480px"));
  });
  it("should return true if the format is 640px by 480px", () => {
    // tslint:disable-next-line:no-magic-numbers
    const image: Uint8Array = new Uint8Array([66, 77, 58, 254, 5, 0, 0, 0, 0, 0, 54, 4, 0, 0, 40, 0,
                                              // tslint:disable-next-line:no-magic-numbers
                                              0, 0, 40, 0, 0, 0, 30, 0, 0, 0, 1, 0, 8, 0, 0, 0, 0, 0,
                                              // tslint:disable-next-line:no-magic-numbers
                                              4, 250, 5, 0, 19, 11, 0, 0, 19, 11, 0, 0, 0, 0]);
    expect(() => formValidationService.isImageDimensionValid(image)).toBeTruthy();
  });
});
