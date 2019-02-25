import { RenderService } from "./render.service";

export class DeplacementCameraService{

    public static keyPress(data: string, render3d: RenderService): void {
        const render = document.getElementById(data);
        if (!!render) {
            render.addEventListener("keypress", (e: KeyboardEvent) => {

            });
        }
    }
}
