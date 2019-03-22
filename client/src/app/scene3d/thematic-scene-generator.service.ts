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
        await Promise.all(THEMATIC_OBJECTS.map((object: ThematicObject) => this.addObject(object)));

        return this.scene;
    }

    private async addObject(object: ThematicObject): Promise<void> {
        return this.thematicObjectGeneratorService.createObject(object).then((group: THREE.Group) => {
            // group.position.set(Math.random() * 200, Math.random() * 200, Math.random() * 200);
            group.position.set(object.baseScale, object.baseScale, object.baseScale);
            this.scene.add(group);
        }).catch((error: Error) => console.error(error.message));
    }
}
