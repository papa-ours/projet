import { Injectable } from "@angular/core";
import { GeometryData } from "../../../../common/communication/geometry";
import { RenderService } from "../scene3d/render.service";

@Injectable({
    providedIn: "root",
})
export class CheatModeService {
    private static readonly BLINKING_FREQUENCY: number = 8;
    private static readonly EMISSIVE_COLOR: number = 0xFF0000;
    private static readonly NEUTRAL_COLOR: number = 0x000000;
    private readonly ONE_SECONDE: number = 1000;
    private isActivated: boolean;
    private timeoutPointer: number;
    private geometries: GeometryData[];
    private isVisible: boolean;

    public constructor(private originalRender: RenderService, private modifiedRender: RenderService) {
        this.isActivated = false;
        this.isVisible = true;
    }

    private findGeometry(renderer: RenderService, geometry: GeometryData): THREE.Object3D | undefined {
        return renderer.scene.children.find(
            (object: THREE.Object3D) => {
                return object.position.x === geometry.position.x &&
                       object.position.y === geometry.position.y &&
                       object.position.z === geometry.position.z;

            });
    }

    private setVisibility(renderer: RenderService, geometry: GeometryData, visibility: boolean): void {
        if (this.findGeometry(renderer, geometry) !== undefined) {
            const object: THREE.Mesh = this.findGeometry(renderer, geometry) as THREE.Mesh;
            object.visible = visibility;
        }
    }

    private setDifferencesVisibility(visibility: boolean): void {
        this.geometries.forEach((geometry: GeometryData) => {
            this.setVisibility(this.originalRender, geometry, visibility);
            this.setVisibility(this.modifiedRender, geometry, visibility);
        });
    }

    private alternateVisibility(): void {
        this.isVisible = this.isVisible ? false : true;
        this.setDifferencesVisibility(this.isVisible);
    }

    private startCheatMode(): number {
        return window.setInterval(() => this.alternateVisibility(), this.ONE_SECONDE / CheatModeService.BLINKING_FREQUENCY);
    }

    public updateGeometries(geometries: GeometryData[]): void {
        this.geometries = geometries;
    }

    public toggleCheatMode(geometries: GeometryData[]): void {
        this.updateGeometries(geometries);
        if (this.isActivated) {
            clearInterval(this.timeoutPointer);
            this.setDifferencesVisibility(true);
        } else {
            this.timeoutPointer = this.startCheatMode();
        }
        this.isActivated = this.isActivated ? false : true;
    }

}
