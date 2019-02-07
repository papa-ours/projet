import { TestBed } from '@angular/core/testing';

import { RandomShapeGeneratorService } from './random-shape-generator.service';

describe('RandomShapeGeneratorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RandomShapeGeneratorService = TestBed.get(RandomShapeGeneratorService);
    expect(service).toBeTruthy();
  });
});
