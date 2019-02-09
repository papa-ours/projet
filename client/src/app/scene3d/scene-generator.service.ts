import { Injectable } from "@angular/core";
import * as THREE from "three";

@Injectable({
    providedIn: "root",
})
export class SceneGeneratorService {

    public constructor() { }
    public createScene(nGeometry: number): THREE.Scene {
        return new THREE.Scene();
    }
}
