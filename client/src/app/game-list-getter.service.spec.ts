import { GameListService } from "./game-list-getter.service";

describe("GameListGetterService", () => {
  let httpClientSpy: { get: jasmine.Spy };
  let  gameListService: GameListService;
  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj("HttpClient", ["get"]);
    // tslint:disable-next-line:no-any
    gameListService = new GameListService( httpClientSpy as any) ;
  });

  it("should be created", () => {
    expect(gameListService).toBeTruthy();
  });
});
