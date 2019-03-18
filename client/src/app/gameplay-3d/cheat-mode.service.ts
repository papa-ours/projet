import { Injectable } from "@angular/core";
import { GeometryData } from "../../../../common/communication/geometry";
import { RenderService } from "../scene3d/render.service";

@Injectable({
    providedIn: "root",
})
export class CheatModeService {

    public constructor(private originalRender: RenderService, private modifiedRender: RenderService) { }

    private findGeometry(renderer: RenderService, geometry: GeometryData): THREE.Object3D | undefined {
        return renderer.scene.children.find(
            (object: THREE.Object3D) => {
                return object.position.x === geometry.position.x &&
                       object.position.y === geometry.position.y &&
                       object.position.z === geometry.position.z;

        });
    }

}
