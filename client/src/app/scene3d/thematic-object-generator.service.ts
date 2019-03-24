import { Injectable } from "@angular/core";
import * as THREE from "three";
import * as OBJLoader from "three-obj-loader";
import { ThematicObject, ThematicObjectType, THEMATIC_OBJECTS } from "../../../../common/communication/thematic-object";

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
                ThematicObjectGeneratorService.desk = await this.loadDesk();
                ThematicObjectGeneratorService.backgroundImage = await this.loadBackground();
                this.createAllObjects()
                    .then((groups: THREE.Group[]) => {
                        ThematicObjectGeneratorService.areObjectsLoaded = true;
                        ThematicObjectGeneratorService.objects = groups;
                        this.scaleObjects();
                        this.createSizes();
                        resolve();
                    })
                    .catch((error: Error) => console.error(error.message));
            } else {
                resolve();
            }
        });
    }

    private loadBackground(): Promise<THREE.Texture> {
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

    private createAllObjects(): Promise<THREE.Group[]> {
        return Promise.all(THEMATIC_OBJECTS.map((thematicObject: ThematicObject) => {
            return new Promise((resolve: (group: THREE.Group) => void) =>
                this.objLoader.load(
                    `${thematicObject.name}/${thematicObject.name}.obj`,
                    resolve,
                    undefined,
                    (error: ErrorEvent) => console.error(error.message),
                ));
        }));
    }

    private loadDesk(): Promise<THREE.Group> {
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

    public async createObject(thematicObject: ThematicObject): Promise<THREE.Group> {
        return new Promise((resolve: (group: THREE.Group) => void) =>
            this.objLoader.load(`${thematicObject.name}/${thematicObject.name}.obj`, resolve));
    }

}
