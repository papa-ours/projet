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
    private createSphere(size: number): THREE.SphereGeometry {
        return new THREE.SphereGeometry(size, size, size);
    }
    private createCube(size: number): THREE.BoxGeometry {
        return new THREE.BoxGeometry(size, size, size);
    }
    private createCone(size: number): THREE.ConeGeometry {
        return new THREE.ConeGeometry(size, size, size);
    }
    private createCylinder(size: number): THREE.CylinderGeometry {
        return new THREE.CylinderGeometry(size, size, size);
    }

    public createPyramid(size: number): THREE.Geometry {
        return  new Pyramid(size).generate();
    }
    public create(size: number): THREE.Geometry {
        const functionSelector: number = Math.floor(Math.random() * this.functionList.length);

        return this.functionList[functionSelector](size);
    }
}
