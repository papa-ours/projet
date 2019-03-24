import { Injectable } from "@angular/core";
import * as THREE from "three";
import { SceneType } from "../../../../common/communication/geometry";
import { VectorInterface } from "../../../../common/communication/vector-interface";
import { RenderService } from "./render.service";

@Injectable({
    providedIn: "root",
})
export class RaycasterService {
    private mouse: THREE.Vector2;
    private rayCaster: THREE.Raycaster;
    private readonly nearestObjectIndex: number = 0;

    public constructor(private originalRender: RenderService, private modifiedRender: RenderService) {
        this.mouse = new THREE.Vector2();
        this.rayCaster = new THREE.Raycaster();
    }

    public static getMousePosition(event: MouseEvent, container: HTMLDivElement): VectorInterface {
        const boundingRect: ClientRect = container.getBoundingClientRect();
        const ratioX: number = (event.clientX - boundingRect.left) / container.clientWidth;
        const ratioY: number = (event.clientY - boundingRect.top) / container.clientHeight;
        // formula for converting x, y coordinates tslint disable for  * 2
        // tslint:disable-next-line:no-magic-numbers
        const x: number = (ratioX * 2) - 1;
        // tslint:disable-next-line:no-magic-numbers
        const y: number = 1 - (ratioY * 2);

        return { x: x, y: y, z: 0 };
    }

    private getIntersections(render: RenderService): THREE.Intersection[] {
        render.camera.updateMatrixWorld(false);
        this.rayCaster.setFromCamera(this.mouse.clone(), render.camera);

        return this.rayCaster.intersectObjects(render.scene.children, true);
    }

    private getNearestPosition(intersections: THREE.Intersection[], type: SceneType): VectorInterface | undefined {
        if (intersections.length > 0) {
            const object: THREE.Object3D = intersections[this.nearestObjectIndex].object;
            const group: THREE.Object3D = object.parent as THREE.Object3D;

            return  type === SceneType.THEMATIC ? group.position : object.position;
        }

        return undefined;
    }

    public findObject(position: VectorInterface, scenetype: SceneType ): VectorInterface | undefined {
        this.mouse.x = position.x;
        this.mouse.y = position.y;
        let intersections: THREE.Intersection[] = this.getIntersections(this.originalRender);
        let intersectionPosition: VectorInterface | undefined = this.getNearestPosition(intersections, scenetype);
        if (intersectionPosition === undefined) {
            intersections = this.getIntersections(this.modifiedRender);
            intersectionPosition = this.getNearestPosition(intersections, scenetype);
        }

        return intersectionPosition;
    }
}
