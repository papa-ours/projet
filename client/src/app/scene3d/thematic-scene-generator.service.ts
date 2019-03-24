import { Injectable } from "@angular/core";
import * as THREE from "three";
import { GeometryData } from "../../../../common/communication/geometry";
import { ThematicObjectType, THEMATIC_OBJECTS } from "../../../../common/communication/thematic-object";
import { ThematicObjectGeneratorService } from "./thematic-object-generator.service";

@Injectable({
    providedIn: "root",
})
export class ThematicSceneGeneratorService {

    private scene: THREE.Scene;

    public constructor(public thematicObjectGeneratorService: ThematicObjectGeneratorService) {
    }

    public async createScene(geometryData: GeometryData[]): Promise<THREE.Scene> {
        this.scene = new THREE.Scene();

        this.thematicObjectGeneratorService.waitForObjects().then(() =>
            geometryData.map((data: GeometryData) => this.addObject(data)),
        );

        return this.scene;
    }

    private addObject(data: GeometryData): void {
        try {
            if (data.thematicObjectType !== undefined) {
                const group: THREE.Group = this.thematicObjectGeneratorService.getObject(data.thematicObjectType);
                group.position.set(data.position.x, data.position.y, data.position.z);
                group.rotation.set(data.rotation.x, data.rotation.y, data.rotation.z);
                group.traverse((object: THREE.Object3D) => {
                    if (object instanceof THREE.Mesh) {
                        object.material = new THREE.MeshPhongMaterial({color: data.color});
                    }
                });
                const scale: number = this.calculateScale(data.thematicObjectType, data.size);
                group.scale.set(scale, scale, scale);
                this.scene.add(group);
            }
        } catch (error) {
            console.error(error.message);
        }
    }

    private calculateScale(thematicObjectType: ThematicObjectType, size: number): number {
        if (thematicObjectType >= ThematicObjectGeneratorService.sizes.length) {
            throw RangeError("Object size could not be found");
        }

        const objectSize: number = ThematicObjectGeneratorService.sizes[thematicObjectType];

        return THEMATIC_OBJECTS[thematicObjectType].baseScale * size / objectSize;
    }
}
