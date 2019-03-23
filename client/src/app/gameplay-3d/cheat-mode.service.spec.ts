import { GeometryData } from "../../../../common/communication/geometry";
import { GeometryFactoryService } from "../scene3d/geometry-factory.service";
import { RenderService } from "../scene3d/render.service";
import { SceneGeneratorService } from "../scene3d/scene-generator.service";
import { CheatModeService } from "./cheat-mode.service";

describe("CheatModeService", () => {
    const geometry: GeometryData[] = [{
        color: 0xFF00FF,
        size: 65,
        type: 2,
        position: { x: 0, y: 0, z: 0 },
        rotation: { x: 0, y: 0, z: 0 },
        isModified: false,
    }];
    const modifiedGeometry: GeometryData[] = [{
        color: 0x00FF00,
        size: 65,
        type: 2,
        position: { x: 0, y: 0, z: 0 },
        rotation: { x: 0, y: 0, z: 0 },
        isModified: false,
    }];
    const originalRenderer: RenderService = new RenderService();
    const modifiedRenderer: RenderService = new RenderService();
    const sceneGenerator: SceneGeneratorService = new SceneGeneratorService(new GeometryFactoryService());
    const div: HTMLDivElement = document.createElement("div");
    let cheatModeService: CheatModeService;

    beforeEach(() => {
        originalRenderer.initialize(div, sceneGenerator.createScene(geometry));
        modifiedRenderer.initialize(div, sceneGenerator.createScene(modifiedGeometry));
        cheatModeService = new CheatModeService(originalRenderer, modifiedRenderer);
    });

    it("should be created", () => {
        originalRenderer.initialize(div, sceneGenerator.createScene(geometry));
        modifiedRenderer.initialize(div, sceneGenerator.createScene(modifiedGeometry));
        expect(cheatModeService).toBeTruthy();
    });

    it("should activate when toggle is called and canceled when called again", () => {
        cheatModeService.toggleCheatMode(geometry);
        expect(cheatModeService["isActivated"]).toBeTruthy();
        cheatModeService.toggleCheatMode(geometry);
        expect(cheatModeService["isActivated"]).toBeFalsy();
    });
});
