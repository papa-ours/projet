import { TestBed } from "@angular/core/testing";

import { RaycasterService } from "./raycaster.service";

describe("RaycasterService", () => {
    beforeEach(() => TestBed.configureTestingModule({}));

    it("should be created", () => {
        const service: RaycasterService = TestBed.get(RaycasterService);
        expect(service).toBeTruthy();
    });
});
