import { TestBed } from "@angular/core/testing";

import { Difference3DCheckerService } from "./difference3d-checker.service";

describe("Difference3DCheckerService", () => {
    beforeEach(() => TestBed.configureTestingModule({}));

    it("should be created", () => {
        const service: Difference3DCheckerService = TestBed.get(Difference3DCheckerService);
        expect(service).toBeTruthy();
    });
});
