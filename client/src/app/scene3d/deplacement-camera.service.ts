import { RenderService } from "./render.service";

export class DeplacementCameraService{

    public static keyPress(data: string, render3d: RenderService): void {
        const scene3d = document.getElementById(data);
        if (!!scene3d) {
            scene3d.addEventListener("keypress", (e: KeyboardEvent) => {
            render3d.moveCamera(1);
            });
        }
    }
}
