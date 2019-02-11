import { TestBed } from '@angular/core/testing';

import { GameFreeViewGenerationService } from './game-free-view-generation.service';

describe('GameFreeViewGenerationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GameFreeViewGenerationService = TestBed.get(GameFreeViewGenerationService);
    expect(service).toBeTruthy();
  });
});
