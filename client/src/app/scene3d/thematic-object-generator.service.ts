import { Injectable } from "@angular/core";
import * as THREE from "three";
import * as OBJLoader from "three-obj-loader";
import { ThematicObject } from "./thematic-object";

@Injectable({
    providedIn: "root",
})
export class ThematicObjectGeneratorService {
    private objLoader: THREE.OBJLoader;

    public constructor() {
        OBJLoader(THREE);
        this.objLoader = new THREE.OBJLoader();
        this.objLoader.setPath("../../assets/3d-objects/");
    }

    public async createObject(thematicObject: ThematicObject): Promise<THREE.Group> {
        return new Promise((resolve: (group: THREE.Group) => void) =>
            this.objLoader.load(`${thematicObject.name}/${thematicObject.name}.obj`, resolve));
    }
}
