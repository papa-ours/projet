import { TestBed } from '@angular/core/testing';

import { FormValidationFreeViewService } from './form-validation-free-view.service';

describe('FormValidationFreeViewService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FormValidationFreeViewService = TestBed.get(FormValidationFreeViewService);
    expect(service).toBeTruthy();
  });
});
