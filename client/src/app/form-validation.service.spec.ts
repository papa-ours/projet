import { FormValidationService } from "./form-validation.service";

describe("FormValidationService", () => {
  let  formValidationService: FormValidationService ;
  beforeEach(() => {
    formValidationService = new FormValidationService();
  });
  it("should be created", () => {
    expect(formValidationService).toBeTruthy();
  });
  it("should return false with an empty name ", () => {
    const file: File = new File([""], "./assets/img/dog.bmp", { lastModified: 1 , type: "image/bmp"});
    const name: string = "";
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
    expect(() => formValidationService.isFormValid(name, file, file)).toThrow();
  });
  it("should return true if both files are bitmap image", () => {
    const file: File = new File([""], "./assets/img/dog.bmp", { lastModified: 1 , type: "image/bmp"});
    const name: string = "Hello";
    expect(formValidationService.isFormValid(name, file, file)).toBeTruthy();
  });
  it("should throw an error if one of both files is not a bitmap image", () => {
    const file1: File = new File([""], "./assets/img/dog.bmp", { lastModified: 1 , type: "image/bmp"});
    const file2: File = new File([""], "./assets/img/logo.png", { lastModified: 1 , type: "image/png"});
    const name: string = "Hello";
    expect(() => formValidationService.isFormValid(name, file1, file2)).toThrow();
  });
  it("should throw an error if one of both files is empty", () => {
    const file2: File = new File([""], "./assets/img/logo.png", { lastModified: 1 , type: "image/bmp"});
    const name: string = "Hello";
    expect(() => formValidationService.isFormValid(name, new File( [""] , "") , file2)).toThrow();
  });
  it("should throw an error if the format is not 640 by 480", () => {
    // tslint:disable-next-line:no-magic-numbers
    const image: Uint8Array = new Uint8Array([255, 255, 255, 255]);
    expect(() => formValidationService.isImageDimensionValid(image)).toThrow();
  });
});
