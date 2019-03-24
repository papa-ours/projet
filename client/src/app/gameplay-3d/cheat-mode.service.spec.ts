import * as THREE from "three";
import { GeometryData } from "../../../../common/communication/geometry";
import { GeometryFactoryService } from "../scene3d/geometry-factory.service";
import { RenderService } from "../scene3d/render.service";
import { SceneGeneratorService } from "../scene3d/scene-generator.service";
import { CheatModeService } from "./cheat-mode.service";

describe("CheatModeService", () => {
    const ORIGINAL_GEOMETRY: GeometryData[] = [
        {
        color: 0xFF00FF,
        size: 65,
        type: 2,
        position: { x: 0, y: 0, z: 0 },
        rotation: { x: 0, y: 0, z: 0 },
        isModified: false,
        },
        {
            color: 0x00FF00,
            size: 65,
            type: 0,
            position: { x: 200, y: 200, z: -400 },
            rotation: { x: 0, y: 0, z: 0 },
            isModified: true,
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

    beforeAll(() => {
        originalRenderer.initialize(div, sceneGenerator.createScene(ORIGINAL_GEOMETRY));
        modifiedRenderer.initialize(div, sceneGenerator.createScene(MODIFIED_GEOMETRY));
        cheatModeService = new CheatModeService(originalRenderer, modifiedRenderer);
    });

    it("should be created", () => {
        expect(cheatModeService).toBeTruthy();
    });

    it("should activate when toggle is called and canceled when called again", () => {
        cheatModeService.toggleCheatMode(ORIGINAL_GEOMETRY);
        expect(cheatModeService["isActivated"]).toBeTruthy();
        cheatModeService.toggleCheatMode(ORIGINAL_GEOMETRY);
        expect(cheatModeService["isActivated"]).toBeFalsy();
    });

    it("should change the emissive visibility 4 times per seconds for the modified scene a visibility change", () => {
        // tslint:disable:no-magic-numbers
        cheatModeService.toggleCheatMode(ORIGINAL_GEOMETRY);
        let mesh: THREE.Mesh = cheatModeService["modifiedRender"].scene.children[0] as THREE.Mesh;
        let prevVisibility: boolean = mesh.visible;

        const interval: number = window.setInterval(
        () => {
            mesh = cheatModeService["modifiedRender"].scene.children[0] as THREE.Mesh;
            const visibility: boolean =  mesh.visible;
            expect(prevVisibility !== visibility).toBeTruthy();
            prevVisibility = visibility;
        },
        253);
        setTimeout(() => (clearInterval(interval)), 1100);
        // tslint:enable:no-magic-numbers
    });

    it("should change the emissive visibility 4 times per seconds for the original scene on a visibility change", () => {
        // tslint:disable:no-magic-numbers
        cheatModeService.toggleCheatMode(ORIGINAL_GEOMETRY);
        let mesh: THREE.Mesh = cheatModeService["originalRender"].scene.children[0] as THREE.Mesh;
        let prevVisibility: boolean =  mesh.visible;

        const interval: number = window.setInterval(
        () => {
            mesh = cheatModeService["originalRender"].scene.children[0] as THREE.Mesh;
            const visibility: boolean =  mesh.visible;
            expect(prevVisibility !== visibility).toBeTruthy();
            prevVisibility = visibility;
        },
        253);
        setTimeout(() => (clearInterval(interval)), 1100);
        // tslint:enable:no-magic-numbers
    });

    it("should change the emissive visibility 4 times per seconds for the orginal scene when an object is deleted", () => {
        // tslint:disable:no-magic-numbers
        cheatModeService.toggleCheatMode(ORIGINAL_GEOMETRY);
        let mesh: THREE.Mesh = cheatModeService["originalRender"].scene.children[1] as THREE.Mesh;
        let prevVisibility: boolean =  mesh.visible;

        const interval: number = window.setInterval(
        () => {
            mesh = cheatModeService["originalRender"].scene.children[1] as THREE.Mesh;
            const visibility: boolean =  mesh.visible;
            expect(prevVisibility !== visibility).toBeTruthy();
            prevVisibility = visibility;
        },
        253);
        setTimeout(() => (clearInterval(interval)), 1100);
        // tslint:enable:no-magic-numbers
    });

    it("should change the emissive visibility 4 times per seconds for the modified scene when an object is added", () => {
        // tslint:disable:no-magic-numbers
        cheatModeService.toggleCheatMode(ORIGINAL_GEOMETRY);
        let mesh: THREE.Mesh = cheatModeService["modifiedRender"].scene.children[1] as THREE.Mesh;
        let prevVisibility: boolean =  mesh.visible;

        const interval: number = window.setInterval(
        () => {
            mesh = cheatModeService["modifiedRender"].scene.children[1] as THREE.Mesh;
            const visibility: boolean =  mesh.visible;
            expect(prevVisibility !== visibility).toBeTruthy();
            prevVisibility = visibility;
        },
        253);
        setTimeout(() => (clearInterval(interval)), 1100);
        // tslint:enable:no-magic-numbers
    });
});
