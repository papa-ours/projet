import { TestBed } from '@angular/core/testing';

import { GeometryGeneratorService } from './geometry-generator.service';

describe('GeometryGeneratorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GeometryGeneratorService = TestBed.get(GeometryGeneratorService);
    expect(service).toBeTruthy();
  });
});
