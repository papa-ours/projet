import { Injectable } from "@angular/core";
import { GeometryData } from "../../../../common/communication/geometry";
import { RenderService } from "../scene3d/render.service";

@Injectable({
    providedIn: "root",
})
export class CheatModeService {
    private readonly ratePerSec: number = 4;
    private readonly ONE_SECONDE: number = 1000;
    private isActivated: boolean;
    private timeoutPointer: number;
    private geometries: GeometryData[];

    public constructor(private originalRender: RenderService, private modifiedRender: RenderService) {
        this.isActivated = false;
    }

    private findGeometry(renderer: RenderService, geometry: GeometryData): THREE.Object3D | undefined {
        return renderer.scene.children.find(
            (object: THREE.Object3D) => {
                return object.position.x === geometry.position.x &&
                       object.position.y === geometry.position.y &&
                       object.position.z === geometry.position.z;

            });
    }

    private setVisibility(renderer: RenderService, geometry: GeometryData): void {
        if (this.findGeometry(renderer, geometry) !== undefined) {
            const object: THREE.Object3D = this.findGeometry(renderer, geometry) as THREE.Object3D;
            object.visible = object.visible ? false : true;
        }
    }

    private flashGeometries(geometries: GeometryData[]): void {
        for (const geometry of this.geometries) {
            this.setVisibility(this.originalRender, geometry);
            this.setVisibility(this.modifiedRender, geometry);
        }
    }

    private startCheatMode(geometries: GeometryData[]): number {
      return  window.setInterval(() => this.flashGeometries(geometries), this.ONE_SECONDE / this.ratePerSec);
    }

    public updtaeGeometries(geometries: GeometryData[]): void {
        this.geometries = geometries;
    }

    public tuggleCheatMode(geometries: GeometryData[]): void {
        this.updtaeGeometries(geometries);
        if (this.isActivated) {
            clearInterval(this.timeoutPointer);
        } else {
            this.timeoutPointer = this.startCheatMode(geometries);
        }
        this.isActivated = this.isActivated ? false : true;
    }

}
