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
        THEMATIC_OBJECTS.forEach(async (object: ThematicObject) => this.addObject);

        return this.scene;
    }

    private async addObject(object: ThematicObject): Promise<void> {
        return this.thematicObjectGeneratorService.createObject(object).then((group: THREE.Group) => {
            group.scale.set(40, 40, 40);
            this.scene.add(group);
        });
    }
}
