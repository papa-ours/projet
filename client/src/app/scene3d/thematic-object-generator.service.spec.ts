import { TestBed } from "@angular/core/testing";

import { ThematicObjectGeneratorService } from "./thematic-object-generator.service";

describe("ThematicObjectGeneratorService", () => {
    beforeEach(() => TestBed.configureTestingModule({}));

    it("should be created", () => {
        const service: ThematicObjectGeneratorService = TestBed.get(ThematicObjectGeneratorService);
        expect(service).toBeTruthy();
    });
});
