import { Injectable } from "@angular/core";
import * as THREE from "three";
import { THEMATIC_OBJECTS } from "./thematic-object";
import { ThematicObjectGeneratorService } from "./thematic-object-generator.service";

@Injectable({
    providedIn: "root",
})
export class ThematicSceneGeneratorService {

    public constructor(public thematicObjectGeneratorService: ThematicObjectGeneratorService) {
        this.create();
    }

    private create(): void {
        this.thematicObjectGeneratorService.createObject(THEMATIC_OBJECTS[6]).then((group: THREE.Group) => {
            console.log(group);
        });
    }
}
