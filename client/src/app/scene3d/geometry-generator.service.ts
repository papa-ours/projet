import { Injectable } from '@angular/core';
import * as THREE from 'three';

@Injectable({
    providedIn: 'root'
})
export class GeometryGeneratorService {

    constructor() { }
    public createSphere(size: number, material: THREE.Material): THREE.Mesh {
        return new THREE.Mesh(new THREE.SphereGeometry(size), material);
    }
    public createCube(size: number, material: THREE.Material): THREE.Mesh {
        return new THREE.Mesh(new THREE.BoxGeometry(size, size, size), material);
    }
    public createCone(size: number, material: THREE.Material): THREE.Mesh {
        return new THREE.Mesh(new THREE.ConeGeometry(size, size, size), material);
    }
    public createCylinder(size: number, material: THREE.Material): THREE.Mesh {
        return new THREE.Mesh(new THREE.CylinderGeometry(size, size, size), material);
    }
    public createPyramid(size: number, material: THREE.Material): THREE.Mesh {
        return new THREE.Mesh(new THREE.TetrahedronGeometry(size, 0), material);
    }

}
