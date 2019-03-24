import { GeometryData } from "../../../../common/communication/geometry";
import { GeometryFactoryService } from "./geometry-factory.service";
import { RaycasterService } from "./raycaster.service";
import { RenderService } from "./render.service";
import { SceneGeneratorService } from "./scene-generator.service";
describe("RaycasterService", () => {
    const ORIGINAL_GEOMETRY: GeometryData[] = [
        {
        color: 0xFF00FF,
        size: 65,
        type: 2,
        position: { x: 0, y: 0, z: 0 },
        rotation: { x: 0, y: 0, z: 0 },
        isModified: false,
        },
    ];
    const MODIFIED_GEOMETRY: GeometryData[] = [
        {
            color: 0x00FF00,
            size: 65,
            type: 2,
            position: { x: 0, y: 0, z: 0 },
            rotation: { x: 0, y: 0, z: 0 },
            isModified: true,
        },
    ];
    const originalRenderer: RenderService = new RenderService();
    const modifiedRenderer: RenderService = new RenderService();
    const sceneGenerator: SceneGeneratorService = new SceneGeneratorService(new GeometryFactoryService());
    const div: HTMLDivElement = document.createElement("div");
    let raycasterService: RaycasterService;

    beforeAll(() => {
        originalRenderer.initialize(div, sceneGenerator.createScene(ORIGINAL_GEOMETRY));
        modifiedRenderer.initialize(div, sceneGenerator.createScene(MODIFIED_GEOMETRY));
        raycasterService = new RaycasterService(originalRenderer, modifiedRenderer);
    });

    it("should be created", () => {
        expect(raycasterService).toBeTruthy();
    });
});
