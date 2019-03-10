import { RenderService } from "./render.service";

export class DeplacementCameraService{

    public static keyPress( render3d: RenderService): void {

        document.body.addEventListener("keypress", (e: KeyboardEvent) => {
            render3d.moveCamera(50);
        });
    }
}
