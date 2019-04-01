import { Injectable } from "@angular/core";
import * as THREE from "three";
import { SKYBOX_MAX, SKYBOX_MIN} from "../../../../common/communication/skybox";

@Injectable({
    providedIn: "root",
})
export class CollisionDetectionService {
    public static MAX_CAST_DISTANCE: number = 50;

    private static computeDirection(camera: THREE.Camera, cameraDirection: THREE.Vector3): THREE.Vector3 {
        const position: THREE.Vector3 = camera.position.clone();
        const direction: THREE.Vector3 = cameraDirection.clone();
        direction.x = cameraDirection.x * Math.cos(camera.rotation.x);
        direction.z = cameraDirection.z * Math.cos(camera.rotation.z);

        return  position.add(direction);
    }

    public static canMove(scene: THREE.Scene, camera: THREE.Camera, cameraDirection: THREE.Vector3): boolean {
        const normalisedDirection: THREE.Vector3 = cameraDirection.clone().normalize();
        const raycaster: THREE.Raycaster = new THREE.Raycaster(
            camera.position,
            normalisedDirection,
            0,
            CollisionDetectionService.MAX_CAST_DISTANCE,
        );
        const intersections: THREE.Intersection[] = raycaster.intersectObjects(scene.children, true);

        return intersections.length <= 0 && CollisionDetectionService.isInsideBorder(camera, cameraDirection);
    }

    public static isInsideBorder(camera: THREE.Camera, cameraDirection: THREE.Vector3): boolean {
        const position: THREE.Vector3 = CollisionDetectionService.computeDirection(camera, cameraDirection);

        return (SKYBOX_MAX.x > position.x && position.x > SKYBOX_MIN.x &&
                SKYBOX_MAX.y > position.y && position.y > SKYBOX_MIN.y &&
                SKYBOX_MAX.z > position.z && position.z > SKYBOX_MIN.z
        );
    }

}
