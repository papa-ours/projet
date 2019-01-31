import { DeleteUsernameService } from './delete-username.service';

describe('DeleteUsernameService', () => {
  let httpClientSpy: { get: jasmine.Spy };
  let  deleteUsernameService: DeleteUsernameService;
  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj("HttpClient", ["get"]);
    // tslint:disable-next-line:no-any
    deleteUsernameService = new DeleteUsernameService( httpClientSpy as any) ;
  });

  it('should be created', () => {
    expect(deleteUsernameService).toBeTruthy();
  });
});
