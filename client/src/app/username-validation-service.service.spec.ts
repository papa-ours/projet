import { TestBed } from '@angular/core/testing';

import { UsernameValidationServiceService } from './username-validation-service.service';

describe('UsernameValidationServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UsernameValidationServiceService = TestBed.get(UsernameValidationServiceService);
    expect(service).toBeTruthy();
  });
});
