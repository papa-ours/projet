import { Injectable } from "@angular/core";
import * as THREE from "three";
import { VectorInterface } from "../../../../common/communication/vector-interface";
import { RenderService } from "./render.service";

@Injectable({
    providedIn: "root",
})
export class RaycasterService {
    private mouse: THREE.Vector2;
    private rayCaster: THREE.Raycaster;
    private readonly nearestPosition: number = 0;

    public constructor(private originalRender: RenderService, private modifiedRender: RenderService) {
       this.mouse = new THREE.Vector2();
       this.rayCaster = new THREE.Raycaster();
    }

    public static getMousePosition(event: MouseEvent, container: HTMLDivElement): VectorInterface {
        const boundingRect: ClientRect = container.getBoundingClientRect();
        const ratioX: number = (event.clientX - boundingRect.left) / container.clientWidth;
        const ratioY: number = (event.clientY - boundingRect.top) / container.clientHeight;
        // formule pour convertire la position en x et en y tslint disable pour le * 2
        // tslint:disable-next-line:no-magic-numbers
        const x: number = (ratioX * 2) - 1;
        // tslint:disable-next-line:no-magic-numbers
        const y: number = 1 - (ratioY * 2);

        return {x: x, y: y, z: 0};
    }

    private getIntersections( render: RenderService): THREE.Intersection[] {
        render.camera.updateMatrixWorld(false);
        this.rayCaster.setFromCamera(this.mouse.clone(),  render.camera);

        return this.rayCaster.intersectObjects(render.scene.children);
    }

    public findObject(position: VectorInterface): VectorInterface | undefined {
        this.mouse.x = position.x;
        this.mouse.y = position.y;
        let intersections: THREE.Intersection[] = this.getIntersections(this.originalRender);
        let nearestObject: THREE.Object3D;
        if (intersections.length > 0) {
            nearestObject = intersections[this.nearestPosition].object;

            return nearestObject.position;
        }
        intersections = this.getIntersections(this.modifiedRender);
        if (intersections.length > 0) {
            nearestObject = intersections[this.nearestPosition].object;

            return nearestObject.position;
        }

        return undefined;
    }
}
