import { Injectable } from "@angular/core";
import * as THREE from "three";
import * as OBJLoader from "three-obj-loader";
import { ThematicObject, THEMATIC_OBJECTS } from "../../../../common/communication/thematic-object";

@Injectable({
    providedIn: "root",
})
export class ThematicObjectGeneratorService {
    public static areObjectsLoaded: boolean = false;
    private static objects: Map<string, THREE.Group>;
    public static sizes: Map<string, number>;
    private objLoader: THREE.OBJLoader;

    public constructor() {
        OBJLoader(THREE);
        this.objLoader = new THREE.OBJLoader();
        this.objLoader.setPath("../../assets/3d-objects/");
    }

    public async waitForObjects(): Promise<{}> {
        return new Promise((resolve: Function) => {
            if (!ThematicObjectGeneratorService.areObjectsLoaded) {
                this.createAllObjects()
                    .then((objectPairs: [string, THREE.Group][]) => {
                        ThematicObjectGeneratorService.areObjectsLoaded = true;
                        ThematicObjectGeneratorService.objects = new Map(objectPairs);
                        this.createSizes();
                        resolve();
                    })
                    .catch((error: Error) => console.error(error.message));
            } else {
                resolve();
            }
        });
    }

    private createSizes(): void {
        ThematicObjectGeneratorService.sizes = new Map();
        ThematicObjectGeneratorService.objects.forEach((group: THREE.Group, name: string) => {
            ThematicObjectGeneratorService.sizes.set(name, this.calculateDimension(group));
        });
    }

    private calculateDimension(group: THREE.Group): number {
        const box: THREE.Box3 = new THREE.Box3().setFromObject(group);
        const dimensions: THREE.Vector3 = box.max.sub(box.min);

        return dimensions.x > dimensions.z ? dimensions.x : dimensions.z;
    }

    private createAllObjects(): Promise<[string, THREE.Group][]> {
        return Promise.all(THEMATIC_OBJECTS.map((thematicObject: ThematicObject) => {
            return new Promise((resolve: (objectPair: [string, THREE.Group]) => void) =>
                this.objLoader.load(
                    `${thematicObject.name}/${thematicObject.name}.obj`,
                    (group: THREE.Group) => resolve([thematicObject.name, group]),
                    undefined,
                    (error: ErrorEvent) => console.error(error.message),
                ));
        }));
    }

    public getObject(thematicObject: ThematicObject): THREE.Group {
        if (!ThematicObjectGeneratorService.areObjectsLoaded) {
            throw RangeError("Objects are not loaded yet");
        }

        const group: THREE.Group | undefined = ThematicObjectGeneratorService.objects.get(thematicObject.name);
        if (!group) {
            throw RangeError("Object requested does not exist");
        }

        return group.clone();
    }

    public async createObject(thematicObject: ThematicObject): Promise<THREE.Group> {
        return new Promise((resolve: (group: THREE.Group) => void) =>
            this.objLoader.load(`${thematicObject.name}/${thematicObject.name}.obj`, resolve));
    }

}
