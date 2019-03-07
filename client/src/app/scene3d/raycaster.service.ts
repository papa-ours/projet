import { Injectable } from "@angular/core";
import * as THREE from "three";
import { RenderService } from "./render.service";

@Injectable({
    providedIn: "root",
})
export class RaycasterService {
    private mouse: THREE.Vector2;
    private rayCaster: THREE.Raycaster;

    public constructor(private renderService: RenderService) {
       this.mouse = new THREE.Vector2();
       this.rayCaster = new THREE.Raycaster();
    }
    private computeMousePosition(event: MouseEvent, container: HTMLDivElement): void {
        const boundingRect: ClientRect = container.getBoundingClientRect();
        this.mouse.x = 2 * ( (event.clientX - boundingRect.left) / container.clientWidth ) - 1;
        this.mouse.y = 1 - 2* ( (event.clientY - boundingRect.top)/ container.clientHeight );
    }

    public findObject(event: MouseEvent, container: HTMLDivElement): THREE.Intersection[] {

        this.computeMousePosition(event, container);

        this.renderService.camera.updateMatrixWorld(false);
        this.rayCaster.setFromCamera(this.mouse.clone(),  this.renderService.camera);

        const intersections: THREE.Intersection[] = this.rayCaster.intersectObjects(this.renderService.scene.children);
        //TODO: temporaire pour voir le raycast a enlever
        for (const intersection of intersections) {
            const hightlightColor: number = 0xFF0000;
            // @ts-ignore
            intersection.object.material.emissive.setHex(hightlightColor);
        }

        return intersections;
    }

}
