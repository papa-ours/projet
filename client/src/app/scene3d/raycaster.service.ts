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
        const ratioX: number = (event.clientX - boundingRect.left) / container.clientWidth;
        const ratioY: number = (event.clientY - boundingRect.top) / container.clientHeight;
        // tslint:disable-next-line:no-magic-numbers
        this.mouse.x =  (ratioX * 2) - 1;
        // tslint:disable-next-line:no-magic-numbers
        this.mouse.y = 1 - (ratioY * 2);
    }

    public findObject(event: MouseEvent, container: HTMLDivElement): THREE.Vector3 | undefined {

        this.computeMousePosition(event, container);

        this.renderService.camera.updateMatrixWorld(false);
        this.rayCaster.setFromCamera(this.mouse.clone(),  this.renderService.camera);

        const intersections: THREE.Intersection[] = this.rayCaster.intersectObjects(this.renderService.scene.children);

        if (intersections.length > 0) {
            const nearestObject: THREE.Intersection = intersections[0];

            return nearestObject.point;
        }

        return undefined;
    }

}
