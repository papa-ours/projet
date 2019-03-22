import { Injectable } from "@angular/core";
import * as THREE from "three";
import * as MTLLoader from "three-mtl-loader";
import * as OBJLoader from "three-obj-loader";
import { GeometryData } from "../../../../common/communication/geometry";
import { GeometryFactoryService } from "./geometry-factory.service";

@Injectable({
    providedIn: "root",
})
export class SceneGeneratorService {

    private readonly BACKGROUND_COLOR: number = 0x515151;

    private scene: THREE.Scene;

    public constructor(private geometryFactoryService: GeometryFactoryService) {
        OBJLoader(THREE);
    }

    private changeBackgroundScene(): void {
        this.scene.background = new THREE.Color(this.BACKGROUND_COLOR);
    }

    // tslint:disable-next-line:max-func-body-length
    private async addGeometry(sceneData: GeometryData[]): Promise<{}> {
        const mtlLoader: THREE.MTLLoader = new MTLLoader();
        mtlLoader.setPath("../../assets/");

        // for (const shape of sceneData) {
        //     const material: THREE.MeshStandardMaterial = new THREE.MeshStandardMaterial({
        //         color: shape.color,
        //         metalness: 0.7,
        //         roughness: 0.2,
        //     });
        //     const randomShape: THREE.Mesh = this.geometryFactoryService.createShape(shape.size, material, shape.type);
        //     randomShape.rotation.set(shape.rotation.x, shape.rotation.y, shape.rotation.z);
        //     randomShape.position.set(shape.position.x, shape.position.y, shape.position.z);
        //     this.scene.add(randomShape);
        // }

        return new Promise((resolve: Function) => {
            mtlLoader.load("Desk/Desk0.5.mtl", (materials: THREE.MaterialCreator) => {
                materials.preload();
                const objLoader: THREE.OBJLoader = new THREE.OBJLoader();
                objLoader.setPath("../../assets/");
                objLoader.load("Desk/Desk0.5.obj", (group: THREE.Group) => {
                    objLoader.setMaterials(materials);
                    group.traverse((object: THREE.Object3D) => {
                        if (object instanceof THREE.Mesh) {
                            object.material = new THREE.MeshPhongMaterial({color: 0xFF0000});
                            object.scale.set(100, 100, 100);
                        }
                    });
                    group.position.set(0, 0, 0);
                    this.scene.add(group);
                    this.scene.add(new THREE.BoxHelper(group, new THREE.Color(0x0000FF)));
                    resolve({});
                });
            });
        });
    }
    public async createScene(sceneData: GeometryData[]): Promise<THREE.Scene> {
        this.scene = new THREE.Scene();
        this.changeBackgroundScene();
        await this.addGeometry(sceneData);

        return new Promise((resolve: Function) => resolve(this.scene));
    }
}
