import { Injectable } from "@angular/core";
import * as THREE from "three";

@Injectable({
    providedIn: "root",
})
export class CollisionService {

    public static canMove(scene: THREE.Scene, camera: THREE.Camera, cameradirection: THREE.Vector3): boolean {
        const raycaster: THREE.Raycaster = new THREE.Raycaster();
        const normalisedDirection: THREE.Vector3 = cameradirection.clone().normalize();
        raycaster.set(camera.position, normalisedDirection);
        const intersections: THREE.Intersection[] = raycaster.intersectObjects(scene.children, true);

        return intersections.length <= 0;
    }

}
