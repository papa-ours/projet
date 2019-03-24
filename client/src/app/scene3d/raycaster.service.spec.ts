import { GeometryData } from "../../../../common/communication/geometry";
import { VectorInterface } from "../../../../common/communication/vector-interface";
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
    const originalContainer: HTMLDivElement = document.createElement("div");
    const modifiedContainer: HTMLDivElement = document.createElement("div");
    let raycasterService: RaycasterService;

    beforeAll(() => {
        Object.defineProperty(originalContainer, "clientWidth", {value: 100});
        Object.defineProperty(originalContainer, "clientHeight", {value: 100});
        Object.defineProperty(modifiedContainer, "clientWidth", {value: 100});
        Object.defineProperty(modifiedContainer, "clientHeight", {value: 100});
        originalRenderer.initialize(originalContainer, sceneGenerator.createScene(ORIGINAL_GEOMETRY));
        modifiedRenderer.initialize(modifiedContainer, sceneGenerator.createScene(MODIFIED_GEOMETRY));
        raycasterService = new RaycasterService(originalRenderer, modifiedRenderer);
    });

    it("should be created", () => {
        expect(raycasterService).toBeTruthy();
    });

    it("should return a position beetween -1 and 1 on getMousePosition", () => {
        const event: MouseEvent = new MouseEvent("mouseEvent", {clientX: 0, clientY: 0});
        const position: VectorInterface = RaycasterService.getMousePosition(event, originalContainer);
        expect(position.x).toBeGreaterThanOrEqual(-1);
        expect(position.x).toBeLessThanOrEqual(1);
        expect(position.y).toBeGreaterThanOrEqual(-1);
        expect(position.y).toBeLessThanOrEqual(1);
        expect(position.z).toEqual(0);
    });

    it("should return the position of an object raycasted if it exists", () => {
        const position: VectorInterface = {x: 0, y: 0, z: 0};
        const raycastedPosition: VectorInterface | undefined = raycasterService.findObject(position, 0);
        expect(raycastedPosition).toBeDefined();
    });

    it("should return undifined if raycasted in a position where there is no object", () => {
        const position: VectorInterface = {x: -1, y: -1, z: 0};
        const raycastedPosition: VectorInterface | undefined = raycasterService.findObject(position, 0);
        expect(raycastedPosition).toBeUndefined();
    });
});
