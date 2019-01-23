import { TestBed } from '@angular/core/testing';
import { GameListService } from './game-list-getter.service';

describe('GameListGetterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GameListService = TestBed.get(GameListService);
    expect(service).toBeTruthy();
  });
});
