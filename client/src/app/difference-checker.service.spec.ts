import { TestBed } from '@angular/core/testing';

import { DifferenceCheckerService } from './difference-checker.service';

describe('DifferenceCheckerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DifferenceCheckerService = TestBed.get(DifferenceCheckerService);
    expect(service).toBeTruthy();
  });
});
