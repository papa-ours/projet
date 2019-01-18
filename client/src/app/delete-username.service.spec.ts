import { TestBed } from '@angular/core/testing';

import { DeleteUsernameService } from './delete-username.service';

describe('DeleteUsernameService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DeleteUsernameService = TestBed.get(DeleteUsernameService);
    expect(service).toBeTruthy();
  });
});
