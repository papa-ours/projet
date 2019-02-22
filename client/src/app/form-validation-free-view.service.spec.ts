import { TestBed } from "@angular/core/testing";
import { FormValidationFreeViewService } from "./form-validation-free-view.service";
import { FreeViewForm } from "./freeViewForm";

describe("FormValidationFreeViewService", () => {
    let freeViewForm: FreeViewForm = { name: "abcdefghijklmn",
                                       nbObjects: 20,
                                       isAdding: true,
                                       isRemoval: true,
                                       isColorChange: true,
                                       sceneType: "geometric",
                                     };
    // tslint:disable:no-magic-numbers
    it("should be created", () => {
        const service: FormValidationFreeViewService = TestBed.get(FormValidationFreeViewService);
        expect(service).toBeTruthy();
    });

    it("should return false with an empty name ", () => {
        freeViewForm.name = "";
        expect(FormValidationFreeViewService.isFormValid(freeViewForm)).toBeFalsy();
    });

    it("should return false with a name shorter or equal to 5 characters  ", () => {
        freeViewForm.name = "abc";
        expect(FormValidationFreeViewService.isFormValid(freeViewForm)).toBeFalsy();
    });

    it("should return false with a name longer than 15 characters ", () => {
        freeViewForm.name = "abcdefghijklmnoq";
        expect(FormValidationFreeViewService.isFormValid(freeViewForm)).toBeFalsy();
    });

    it("should return true with a name between 5 and 15 characters ", () => {
        freeViewForm.name = "abcdefghijklmno";
        expect(FormValidationFreeViewService.isFormValid(freeViewForm)).toBeTruthy();
    });

    it("should return false with a number of objects below 10", () => {
        freeViewForm.nbObjects = 8;
        expect(FormValidationFreeViewService.isFormValid(freeViewForm)).toBeFalsy();
    });

    it("should return false with a number of objects over 200", () => {
        freeViewForm.nbObjects = 210;
        expect(FormValidationFreeViewService.isFormValid(freeViewForm)).toBeFalsy();
    });

    it("should return true with a number of objects between 10 and 200", () => {
        freeViewForm.nbObjects = 100;
        expect(FormValidationFreeViewService.isFormValid(freeViewForm)).toBeTruthy();
    });

    it("should return false when none of the modifications options are selected", () => {
        freeViewForm.isAdding = false;
        freeViewForm.isRemoval = false;
        freeViewForm.isColorChange = false;
        expect(FormValidationFreeViewService.isFormValid(freeViewForm)).toBeFalsy();
    });

    it("should return true when at least one of the modifications are selected", () => {
        freeViewForm.name = "abcdefghijklmno";
        freeViewForm.nbObjects = 20;
        freeViewForm.isAdding = true;
        freeViewForm.isRemoval = false;
        freeViewForm.isColorChange = false;
        expect(FormValidationFreeViewService.isFormValid(freeViewForm)).toBeTruthy();
    });
});
