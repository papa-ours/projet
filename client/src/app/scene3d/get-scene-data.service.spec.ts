import { TestBed } from "@angular/core/testing";

import { GetSceneDataService } from "./get-scene-data.service";

describe("GetSceneDataService", () => {
    beforeEach(() => TestBed.configureTestingModule({}));

    it("should be created", () => {
        const service: GetSceneDataService = TestBed.get(GetSceneDataService);
        expect(service).toBeTruthy();
    });
});
