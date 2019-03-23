import { Injectable } from "@angular/core";
import { GeometryData } from "../../../../common/communication/geometry";
import { RenderService } from "../scene3d/render.service";

@Injectable({
    providedIn: "root",
})
export class CheatModeService {
    private readonly ratePerSec: number = 8;
    private readonly ONE_SECONDE: number = 1000;
    private readonly emissiveColor: number = 0xFF0000;
    private readonly neutralColor: number = 0x000000;
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
            const objectMaterial: THREE.MeshStandardMaterial = object.material as THREE.MeshStandardMaterial;
            objectMaterial.emissive.setHex(visibility ?  this.neutralColor : this.emissiveColor);
        }
    }

    private setDifferencesVisibility(visibility: boolean): void {
        for (const geometry of this.geometries) {
            this.setVisibility(this.originalRender, geometry, visibility);
            this.setVisibility(this.modifiedRender, geometry, visibility);
        }
    }

    private alternateVisibility(): void {
        this.isVisible = this.isVisible ? false : true;
        this.setDifferencesVisibility(this.isVisible);
    }

    private startCheatMode(): number {
        return window.setInterval(() => this.alternateVisibility(), this.ONE_SECONDE / this.ratePerSec);
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
