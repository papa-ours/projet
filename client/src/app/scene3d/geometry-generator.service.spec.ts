import { TestBed } from "@angular/core/testing";

import { GeometryGeneratorService } from "./geometry-generator.service";

describe("GeometryGeneratorService", () => {
    let geometryGeneratorService: GeometryGeneratorService;
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [GeometryGeneratorService],
        });
        geometryGeneratorService = TestBed.get(GeometryGeneratorService);
    });

    it("should be created", () => {
    expect(geometryGeneratorService).toBeTruthy();
  });
});
