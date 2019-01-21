import { TestBed } from '@angular/core/testing';

import { DifferenceImageService } from './difference-image.service';

describe('DifferenceImageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DifferenceImageService = TestBed.get(DifferenceImageService);
    expect(service).toBeTruthy();
  });
});
