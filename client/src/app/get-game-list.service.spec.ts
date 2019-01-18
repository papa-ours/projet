import { TestBed } from '@angular/core/testing';

import { GetGameListService } from './get-game-list.service';

describe('GetGameListService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetGameListService = TestBed.get(GetGameListService);
    expect(service).toBeTruthy();
  });
});
