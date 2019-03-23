import * as THREE from "three";
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
    const modifiedGeometry: GeometryData[] = [
        {
            color: 0x00FF00,
            size: 65,
            type: 2,
            position: { x: 0, y: 0, z: 0 },
            rotation: { x: 0, y: 0, z: 0 },
            isModified: true,
        },
        {
            color: 0x00FF00,
            size: 65,
            type: 2,
            position: { x: 100, y: 100, z: 100 },
            rotation: { x: 0, y: 0, z: 0 },
            isModified: true,
        },
    ];
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
        expect(cheatModeService).toBeTruthy();
    });

    it("should activate when toggle is called and canceled when called again", () => {
        cheatModeService.toggleCheatMode(geometry);
        expect(cheatModeService["isActivated"]).toBeTruthy();
        cheatModeService.toggleCheatMode(geometry);
        expect(cheatModeService["isActivated"]).toBeFalsy();
    });

    it("should change the emissive color 4 times per seconds for the modified scene a color change", () => {
        // tslint:disable:no-magic-numbers
        cheatModeService.toggleCheatMode(geometry);
        let mesh: THREE.Mesh = cheatModeService["modifiedRender"].scene.children[0] as THREE.Mesh;
        let material: THREE.MeshStandardMaterial = mesh.material as THREE.MeshStandardMaterial;
        let prevColor: number =  material.emissive.getHex();

        const interval: number = window.setInterval(() => {
            mesh = cheatModeService["modifiedRender"].scene.children[0] as THREE.Mesh;
            material = mesh.material as THREE.MeshStandardMaterial;
            const color: number =  material.emissive.getHex();
            expect(prevColor !== color).toBeTruthy();
            prevColor = color;
        },                                          253);
        setTimeout(() => (clearInterval(interval)), 1100);
        // tslint:enable:no-magic-numbers
    });

    it("should change the emissive color 4 times per seconds for the original scene on a color change", () => {
        // tslint:disable:no-magic-numbers
        cheatModeService.toggleCheatMode(geometry);
        let mesh: THREE.Mesh = cheatModeService["originalRender"].scene.children[0] as THREE.Mesh;
        let material: THREE.MeshStandardMaterial = mesh.material as THREE.MeshStandardMaterial;
        let prevColor: number =  material.emissive.getHex();

        const interval: number = window.setInterval(() => {
            mesh = cheatModeService["originalRender"].scene.children[0] as THREE.Mesh;
            material = mesh.material as THREE.MeshStandardMaterial;
            const color: number =  material.emissive.getHex();
            expect(prevColor !== color).toBeTruthy();
            prevColor = color;
        },                                          253);
        setTimeout(() => (clearInterval(interval)), 1100);
        // tslint:enable:no-magic-numbers
    });
});
