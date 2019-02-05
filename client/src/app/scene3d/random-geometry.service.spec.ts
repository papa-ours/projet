import { TestBed } from '@angular/core/testing';

import { RandomGeometryService } from './random-geometry.service';

describe('RandomGeometryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RandomGeometryService = TestBed.get(RandomGeometryService);
    expect(service).toBeTruthy();
  });
});
