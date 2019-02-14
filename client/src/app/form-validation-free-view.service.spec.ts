import { TestBed } from '@angular/core/testing';

import { FormValidationFreeViewService } from './form-validation-free-view.service';

describe('FormValidationFreeViewService', () => {
    const formValidationFreeViewService: FormValidationFreeViewService = new FormValidationFreeViewService();
    let name: string = "abcdefghijklm";
    let nbObjects = 20;
    it('should be created', () => {
        const service: FormValidationFreeViewService = TestBed.get(FormValidationFreeViewService);
        expect(service).toBeTruthy();
    });
    it("should return false with an empty name ", () => {
        name = "";
        expect(formValidationFreeViewService.isFormValid(name,nbObjects)).toBeFalsy();
    });
    it("should return false with a name shorter or equal to 5 characters  ", () => {
        name = "abc";
        expect(formValidationFreeViewService.isFormValid(name,nbObjects)).toBeFalsy();
    });
    it("should return false with a name longer or equal to 15 characters ", () => {
        name = "abcdefghijklmno";
        expect(formValidationFreeViewService.isFormValid(name,nbObjects)).toBeFalsy();;
    });
    it("should return true with a name between 5 and 15 characters ", () => {
        expect(formValidationFreeViewService.isFormValid(name,nbObjects)).toBeTruthy();;
    });
    it("should return false with a number of objects below 10", () => {
        nbObjects = 8;
        expect(formValidationFreeViewService.isFormValid(name,nbObjects)).toBeFalsy();;
    });
});
