import { TestBed } from '@angular/core/testing';

import { FormValidationFreeViewService } from './form-validation-free-view.service';

describe('FormValidationFreeViewService', () => {
    const formValidationFreeViewService: FormValidationFreeViewService = new FormValidationFreeViewService();

    it('should be created', () => {
        const service: FormValidationFreeViewService = TestBed.get(FormValidationFreeViewService);
        expect(service).toBeTruthy();
    });
    it("should return false with an empty name ", () => {
        const name: string = "";
        expect(formValidationFreeViewService.isFormValid(name)).toBeFalsy();
    });
});
