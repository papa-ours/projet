import { TestBed } from "@angular/core/testing";

import { ThematicSceneGeneratorService } from "./thematic-scene-generator.service";

describe("ThematicSceneGeneratorService", () => {
    beforeEach(() => TestBed.configureTestingModule({}));

    it("should be created", () => {
        const service: ThematicSceneGeneratorService = TestBed.get(ThematicSceneGeneratorService);
        expect(service).toBeTruthy();
    });
});
