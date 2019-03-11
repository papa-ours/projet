import { RenderService } from "./render.service";

export class DeplacementCameraService{

    public static readonly RIGHT_CLICK: number = 2;
    private static render3d: RenderService;

    public static keyPress(render3d: RenderService): void {
        DeplacementCameraService.render3d = render3d;
        document.body.addEventListener("keypress", this.moveCamera, false);

        document.body.addEventListener("mousedown", (e: MouseEvent) => {
            if (e.buttons === this.RIGHT_CLICK){
                document.body.addEventListener("mousemove", this.rotateCamera, false);
                }
        });

        document.body.addEventListener("mouseup", (e: MouseEvent) => {
            if (e.buttons === this.RIGHT_CLICK){
                console.log("wah");
                document.body.removeEventListener("mousemove", this.rotateCamera, false);
                }
        });
    }

    private static moveCamera(e: KeyboardEvent): void {
        switch (e.key){
            case "w":
            DeplacementCameraService.render3d.translateCameraZAxis(-50);
            break;
            case "a":
            DeplacementCameraService.render3d.translateCameraXAxis(-50);
            break;
            case "s":
            DeplacementCameraService.render3d.translateCameraZAxis(50);
            break;
            case "d":
            DeplacementCameraService.render3d.translateCameraXAxis(50);
            break;
            default:
        }
    }

    private static rotateCamera(e: MouseEvent): void {
        DeplacementCameraService.render3d.rotateCameraY(e.movementX);
        DeplacementCameraService.render3d.rotateCameraX(e.movementY);
    }
}
