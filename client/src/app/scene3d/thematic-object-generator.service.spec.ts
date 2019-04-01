import { TestBed } from "@angular/core/testing";

import { ThematicObjectType } from "../../../../common/communication/thematic-object";
import { ThematicObjectGeneratorService } from "./thematic-object-generator.service";

describe("ThematicObjectGeneratorService", () => {
    beforeEach(() => TestBed.configureTestingModule({}));
    it("should be created", () => {
        const service: ThematicObjectGeneratorService = TestBed.get(ThematicObjectGeneratorService);
        expect(service).toBeTruthy();
    });

    it("should create the objects", async () => {
        const service: ThematicObjectGeneratorService = TestBed.get(ThematicObjectGeneratorService);

        service.waitForObjects()
        .then(() => {
            expect(ThematicObjectGeneratorService.areObjectsLoaded).toBeTruthy();
        })
        .catch((error: Error) => console.error(error.message));
    });

    it("should return the right object", async () => {
        const service: ThematicObjectGeneratorService = TestBed.get(ThematicObjectGeneratorService);

        service.waitForObjects().then(() => {
            const object: THREE.Group = service.getObject(ThematicObjectType.APPLE);
            expect(object).toBeDefined();
        })
        .catch((error: Error) => console.error(error.message));
    });

    it("should throw if the object does not exist", async () => {
        const service: ThematicObjectGeneratorService = TestBed.get(ThematicObjectGeneratorService);
        service.waitForObjects().then(() => {
            expect(() => service.getObject(-1)).toThrowError("Object requested does not exist");
        })
        .catch((error: Error) => console.error(error.message));
    });
});
