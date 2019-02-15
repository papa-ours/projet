import { TestBed } from '@angular/core/testing';

import { FormValidationFreeViewService } from './form-validation-free-view.service';

describe('FormValidationFreeViewService', () => {
    let name: string = "abcdefghijklmno";
    let nbObjects = 20;
    it('should be created', () => {
        const service: FormValidationFreeViewService = TestBed.get(FormValidationFreeViewService);
        expect(service).toBeTruthy();
    });
    it("should return false with an empty name ", () => {
        name = "";
        expect(FormValidationFreeViewService.isFormValid(name,nbObjects)).toBeFalsy();
    });
    it("should return false with a name shorter or equal to 5 characters  ", () => {
        name = "abc";
        expect(FormValidationFreeViewService.isFormValid(name,nbObjects)).toBeFalsy();
    });
    it("should return false with a name longer than 15 characters ", () => {
        name = "abcdefghijklmnoq";
        expect(FormValidationFreeViewService.isFormValid(name,nbObjects)).toBeFalsy();;
    });
    it("should return true with a name between 5 and 15 characters ", () => {
        name = "abcdefghijklmno";
        expect(FormValidationFreeViewService.isFormValid(name,nbObjects)).toBeTruthy();;
    });
    it("should return false with a number of objects below 10", () => {
        nbObjects = 8;
        expect(FormValidationFreeViewService.isFormValid(name,nbObjects)).toBeFalsy();;
    });
    it("should return false with a number of objects over 200", () => {
        nbObjects = 210;
        expect(FormValidationFreeViewService.isFormValid(name,nbObjects)).toBeFalsy();;
    });
    
});
