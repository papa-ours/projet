import { Injectable } from "@angular/core";
import * as THREE from "three";
import { Pyramid } from "./pyramid";
@Injectable({
    providedIn: "root",
})
export class RandomGeometryService {

    private functionList: Function [] = [];
    public constructor() {
        this.functionList.push(this.createSphere);
        this.functionList.push(this.createCube);
        this.functionList.push(this.createCone);
        this.functionList.push(this.createCylinder);
        this.functionList.push(this.createPyramid);
    }
    private createSphere(size: number, material: THREE.Material): THREE.Mesh {
        return new THREE.Mesh( new THREE.SphereGeometry(size, size, size), material);
    }
    private createCube(size: number, material: THREE.Material): THREE.Mesh {
        return  new THREE.Mesh( new THREE.BoxGeometry(size, size, size), material);
    }
    private createCone(size: number, material: THREE.Material): THREE.Mesh {
        return  new THREE.Mesh( new THREE.ConeGeometry(size, size, size), material);
    }
    private createCylinder(size: number, material: THREE.Material): THREE.Mesh {
        return  new THREE.Mesh( new THREE.CylinderGeometry(size, size, size), material);
    }

    public createPyramid(size: number, material: THREE.Material): THREE.Mesh {
        return   new THREE.Mesh( new Pyramid(size).generate(), material);
    }
    public create(size: number, material: THREE.Material): THREE.Mesh {
        const functionSelector: number = Math.floor(Math.random() * this.functionList.length);

        return this.functionList[functionSelector](size, material);
    }
}
