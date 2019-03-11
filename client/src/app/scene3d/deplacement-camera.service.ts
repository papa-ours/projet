import { RenderService } from "./render.service";

export class DeplacementCameraService{

    public readonly RIGHT_CLICK: number = 2;

    public keyPress( render3d: RenderService): void {

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
            if (e.buttons === this.RIGHT_CLICK){
                document.body.addEventListener("mousemove", (e: MouseEvent) => {
                    render3d.rotateCameraY(e.movementX);
                    render3d.rotateCameraX(e.movementY);
                });
                }
        });

        document.body.addEventListener("mouseup", (e: MouseEvent) => {
            
        });
    }
}
