import { Injectable } from "@angular/core";
import * as THREE from "three";
import { VectorInterface } from "../../../../common/communication/vector-interface";

@Injectable({
    providedIn: "root",
})
export class GeometryGeneratorService {

    public createSphere(size: VectorInterface, material: THREE.Material): THREE.Mesh {
        return new THREE.Mesh(new THREE.SphereGeometry(size.x), material);
    }
    public createCube(size: VectorInterface, material: THREE.Material): THREE.Mesh {
        return new THREE.Mesh(new THREE.BoxGeometry(size.x, size.y, size.z), material);
    }
    public createCone(size: VectorInterface, material: THREE.Material): THREE.Mesh {
        return new THREE.Mesh(new THREE.ConeGeometry(size.x, size.y, size.z), material);
    }
    public createCylinder(size: VectorInterface, material: THREE.Material): THREE.Mesh {
        return new THREE.Mesh(new THREE.CylinderGeometry(size.x, size.y, size.z), material);
    }
    public createPyramid(size: VectorInterface, material: THREE.Material): THREE.Mesh {
        return new THREE.Mesh(new THREE.TetrahedronGeometry(size.x, 0), material);
    }

}
