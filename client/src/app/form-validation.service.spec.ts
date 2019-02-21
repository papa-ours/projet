import { FormValidationService } from "./form-validation.service";

// tslint:disable:no-magic-numbers
describe("FormValidationService", () => {
    const formValidationService: FormValidationService = new FormValidationService();
    it("should be created", () => {
        expect(formValidationService).toBeTruthy();
    });
    it("should return false with an empty name ", () => {
        const name: string = "";
        const file: File = new File([""], "./assets/img/dog.bmp", { lastModified: 1, type: "image/bmp" });
        expect(formValidationService.isFormValid(name, file, file)).toBeFalsy();
    });
    it("should return false with a short name", () => {
        const file: File = new File([""], "./assets/img/dog.bmp", { lastModified: 1, type: "image/bmp" });
        const name: string = "ABC";
        expect(formValidationService.isFormValid(name, file, file)).toBeFalsy();
    });
    it("should return false with a name length greater than 15 characteres", () => {
        const file: File = new File([""], "./assets/img/dog.bmp", { lastModified: 1, type: "image/bmp" });
        const name: string = "ABCDEFGHIJKLMNOP";
        expect(formValidationService.isFormValid(name, file, file)).toBeFalsy();
    });
    it("should return true with a name length beetween 5 and 15 characteres", () => {
        const file: File = new File([""], "./assets/img/dog.bmp", { lastModified: 1, type: "image/bmp" });
        const name: string = "Hello";
        expect(formValidationService.isFormValid(name, file, file)).toBeTruthy();
    });
    it("should return true with a name length beetween 5 and 15 characteres", () => {
        const file: File = new File([""], "./assets/img/dog.bmp", { lastModified: 1, type: "image/bmp" });
        const name: string = "Hello world!!!!";
        expect(formValidationService.isFormValid(name, file, file)).toBeTruthy();
    });
    it("should return an error if both files are not a bitmap image", () => {
        const file: File = new File([""], "./assets/img/logo.png", { lastModified: 1, type: "image/png" });
        const name: string = "Hello";
        expect(() => formValidationService.isFormValid(name, file, file))
            .toThrow(new Error("Les fichiers doivent etre dans le format Bitmap (.bmp)"));
    });
    it("should throw an error if one of both files is not a bitmap image", () => {
        const file1: File = new File([""], "./assets/img/dog.bmp", { lastModified: 1, type: "image/bmp" });
        const file2: File = new File([""], "./assets/img/logo.png", { lastModified: 1, type: "image/png" });
        const name: string = "Hello";
        expect(() => formValidationService.isFormValid(name, file1, file2))
            .toThrow(new Error("Les fichiers doivent etre dans le format Bitmap (.bmp)"));
    });
    it("should throw an error if one of both files is undefined", () => {
        const file2: File = new File([""], "./assets/img/logo.png", { lastModified: 1, type: "image/png" });
        const name: string = "Hello";
        expect(() => {
            // The file needs to be undefined in order to throw the desired error
            // @ts-ignore
            formValidationService.isFormValid(name, undefined, file2);
        }).toThrow(new Error("Les fichiers ne doivent pas être vide"));
    });
});
