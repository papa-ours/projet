import { Injectable } from "@angular/core";
import * as THREE from "three";
import * as OBJLoader from "three-obj-loader";
import { ThematicObject, THEMATIC_OBJECTS } from "./thematic-object";

@Injectable({
    providedIn: "root",
})
export class ThematicObjectGeneratorService {
    public static areObjectsLoaded: boolean = false;
    private static objects: Map<string, THREE.Group>;
    private objLoader: THREE.OBJLoader;

    public constructor() {
        OBJLoader(THREE);
        this.objLoader = new THREE.OBJLoader();
        this.objLoader.setPath("../../assets/3d-objects/");
        if (!ThematicObjectGeneratorService.areObjectsLoaded) {
            this.createAllObjects()
                .then((objectPairs: [string, THREE.Group][]) => {
                    ThematicObjectGeneratorService.areObjectsLoaded = true;
                    ThematicObjectGeneratorService.objects = new Map(objectPairs);
                })
                .catch((error: Error) => console.error(error.message));
        }
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
