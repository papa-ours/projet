import { DifferenceImageService } from './difference-image.service';

describe('DifferenceImageService', () => {
  let httpClientSpy: { get: jasmine.Spy };
  let  deleteUsernameService: DifferenceImageService;
  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj("HttpClient", ["get"]);
    // tslint:disable-next-line:no-any
    deleteUsernameService = new DifferenceImageService( httpClientSpy as any) ;
  });
  it('should be created', () => {
    expect(deleteUsernameService).toBeTruthy();
  });
});
