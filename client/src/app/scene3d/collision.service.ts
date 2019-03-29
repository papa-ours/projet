import { Injectable } from "@angular/core";
import { SKYBOX_MAX, SKYBOX_MIN} from "../../../../common/communication/skybox";
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

        return intersections.length <= 0 && CollisionDetectionService.isInsideBorder(camera, cameradirection);
    }

    public static isInsideBorder(camera: THREE.Camera, cameradirection: THREE.Vector3): boolean {
        const position: THREE.Vector3 = camera.position.clone();
        position.add(cameradirection);

        return (SKYBOX_MAX.x < position.x && position.x > SKYBOX_MIN.x &&
                SKYBOX_MAX.y < position.y && position.y > SKYBOX_MIN.y &&
                SKYBOX_MAX.z < position.z && position.z > SKYBOX_MIN.z
        );
    }

}
