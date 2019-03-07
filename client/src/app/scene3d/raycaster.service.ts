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
    private computeMousePosition(event: MouseEvent, container: HTMLDivElement) {
        const boundingRect: ClientRect = container.getBoundingClientRect();
        this.mouse.x = 2 * ( (event.clientX - boundingRect.left) / container.clientWidth ) - 1;
        this.mouse.y = 1 - 2* ( (event.clientY - boundingRect.top)/ container.clientHeight );
    }

}
