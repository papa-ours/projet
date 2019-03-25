import { Injectable } from "@angular/core";
import * as THREE from "three";
import { ThematicObject, ThematicObjectType, THEMATIC_OBJECTS } from "../../../../common/communication/thematic-object";
// found in the documentation without this the client dont compile
// tslint:disable-next-line:no-any
declare var require: any;
// tslint:disable-next-line:typedef variable-name
const OBJLoader = require("three-obj-loader");
OBJLoader(THREE);

@Injectable({
    providedIn: "root",
})
export class ThematicObjectGeneratorService {
    public static areObjectsLoaded: boolean = false;
    private static objects: THREE.Group[];
    public static desk: THREE.Group;
    public static backgroundImage: THREE.Texture;
    public static sizes: number[];
    private objLoader: THREE.OBJLoader;

    public constructor() {
        OBJLoader(THREE);
        this.objLoader = new THREE.OBJLoader();
        this.objLoader.setPath("../../assets/3d-objects/");
    }

    public async waitForObjects(): Promise<{}> {
        return new Promise(async (resolve: Function) => {
            if (!ThematicObjectGeneratorService.areObjectsLoaded) {
                this.createAllAssets()
                    .then((groups: THREE.Group[]) => {
                        ThematicObjectGeneratorService.areObjectsLoaded = true;
                        resolve();
                    })
                    .catch((error: Error) => console.error(error.message));
            } else {
                resolve();
            }
        });
    }

    private async createAllAssets(): Promise<{}> {
        return new Promise(async (resolve: Function) => {
            ThematicObjectGeneratorService.desk = await this.loadDesk();
            ThematicObjectGeneratorService.backgroundImage = await this.loadBackground();
            ThematicObjectGeneratorService.objects = await this.createAllObjects();
            this.scaleObjects();
            this.createSizes();

            resolve();
        });
    }

    private async loadBackground(): Promise<THREE.Texture> {
        const loader: THREE.TextureLoader = new THREE.TextureLoader();

        return new Promise((resolve: (texture: THREE.Texture) => void) =>
            loader.load(
                "../../assets/background.jpg",
                resolve,
                undefined,
                (error: ErrorEvent) => console.error(error.message),
            ));
    }

    private scaleObjects(): void {
        ThematicObjectGeneratorService.objects.forEach((group: THREE.Group, index: number) => {
            const scale: number = THEMATIC_OBJECTS[index].baseScale;
            group.scale.set(scale, scale, scale);
        });
    }

    private createSizes(): void {
        ThematicObjectGeneratorService.sizes = [];
        ThematicObjectGeneratorService.objects.forEach((group: THREE.Group, index: number) => {
            ThematicObjectGeneratorService.sizes[index] = this.calculateDimension(group, index);
        });
    }

    private calculateDimension(group: THREE.Group, index: number): number {
        const scale: number = THEMATIC_OBJECTS[index].baseScale;
        group.scale.set(scale, scale, scale);
        const box: THREE.Box3 = new THREE.Box3().setFromObject(group);
        const dimensions: THREE.Vector3 = box.max.sub(box.min);

        return dimensions.x > dimensions.z ? dimensions.x : dimensions.z;
    }

    private async createAllObjects(): Promise<THREE.Group[]> {
        return Promise.all(THEMATIC_OBJECTS.map(async (thematicObject: ThematicObject) => {
            return new Promise((resolve: (group: THREE.Group) => void) =>
                this.objLoader.load(
                    `${thematicObject.name}/${thematicObject.name}.obj`,
                    resolve,
                    undefined,
                    (error: ErrorEvent) => console.error(error.message),
                ));
        }));
    }

    private async loadDesk(): Promise<THREE.Group> {
        return new Promise((resolve: (group: THREE.Group) => void) =>
            this.objLoader.load(
                "desk/desk.obj",
                resolve,
                undefined,
                (error: ErrorEvent) => console.error(error.message),
            ));
    }

    public getObject(thematicObjectType: ThematicObjectType): THREE.Group {
        if (!ThematicObjectGeneratorService.areObjectsLoaded) {
            throw RangeError("Objects are not loaded yet");
        }

        if (thematicObjectType > ThematicObjectGeneratorService.objects.length) {
            throw RangeError("Object requested does not exist");
        }

        return ThematicObjectGeneratorService.objects[thematicObjectType].clone();
    }
}
