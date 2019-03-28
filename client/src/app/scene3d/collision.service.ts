import { Injectable } from "@angular/core";
import * as THREE from "three";

@Injectable({
    providedIn: "root",
})
export class CollisionDetectionService {
    public static MAX_CAST_DISTANCE: number = 20;

    public static canMove(scene: THREE.Scene, camera: THREE.Camera, cameradirection: THREE.Vector3): boolean {
        const normalisedDirection: THREE.Vector3 = cameradirection.clone().normalize();
        const raycaster: THREE.Raycaster = new THREE.Raycaster(
            camera.position,
            normalisedDirection,
            0,
            CollisionDetectionService.MAX_CAST_DISTANCE,
        );
        const intersections: THREE.Intersection[] = raycaster.intersectObjects(scene.children, true);

        return intersections.length <= 0;
    }

}
