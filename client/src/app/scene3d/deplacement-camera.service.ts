import { RenderService } from "./render.service";

export class DeplacementCameraService{

    public static keyPress( render3d: RenderService): void {

        document.body.addEventListener("keypress", (e: KeyboardEvent) => {
            switch (e.key){
                case "w":
                render3d.moveCamera(-50);
                break;
                case "s":
                render3d.moveCamera(50);
                break;
                default:
            }
        });

        document.body.addEventListener("mousedown", (e: MouseEvent) => {

        });
    }
}
