import { Injectable } from "@angular/core";
import * as THREE from "three";
import { ThematicObject, THEMATIC_OBJECTS } from "./thematic-object";
import { ThematicObjectGeneratorService } from "./thematic-object-generator.service";

@Injectable({
    providedIn: "root",
})
export class ThematicSceneGeneratorService {

    private scene: THREE.Scene;

    public constructor(public thematicObjectGeneratorService: ThematicObjectGeneratorService) {
    }

    public async createScene(): Promise<THREE.Scene> {
        this.scene = new THREE.Scene();

        this.thematicObjectGeneratorService.waitForObjects().then(() =>
            THEMATIC_OBJECTS.map((object: ThematicObject) => this.addObject(object)),
        );

        return this.scene;
    }

    private addObject(object: ThematicObject): void {
        try {
            this.scene.add(this.thematicObjectGeneratorService.getObject(object));
        } catch (error) {
            console.error(error.message);
        }
    }
}
