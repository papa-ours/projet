import { TestBed } from '@angular/core/testing';

import { FormValidationFreeViewService } from './form-validation-free-view.service';

describe('FormValidationFreeViewService', () => {
    const formValidationFreeViewService: FormValidationFreeViewService = new FormValidationFreeViewService();
    let name: string = "abcdefghijklmno";
    let nbObjects = 20;
    it('should be created', () => {
        const service: FormValidationFreeViewService = TestBed.get(FormValidationFreeViewService);
        expect(service).toBeTruthy();
    });
    it("should return false with an empty name ", () => {
        name = "";
        expect(formValidationFreeViewService.isFormValid(name,nbObjects)).toBeFalsy();
    });
    it("should return false with a name shorter than 5 characters  ", () => {
        name = "abc";
        expect(formValidationFreeViewService.isFormValid(name,nbObjects)).toBeFalsy();
    });
    it("should return false with a name longer than 15 characters ", () => {
        name = "abcdefghijklmnoq";
        expect(formValidationFreeViewService.isFormValid(name,nbObjects)).toBeFalsy();;
    });
    it("should return true with a name between 5 and 15 characters ", () => {
        expect(formValidationFreeViewService.isFormValid(name,nbObjects)).toBeTruthy();;
    });
});
