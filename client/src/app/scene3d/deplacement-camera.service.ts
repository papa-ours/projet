import { RenderService } from "./render.service";

export class DeplacementCameraService{

    public readonly RIGHT_CLICK: number = 2;
    private render3d: RenderService;

    public constructor(renderService: RenderService){
        this.render3d = renderService;
    }
    public keyPress(): void {

        document.body.addEventListener("keypress", this.moveCamera, false);

        document.body.addEventListener("mousedown", (e: MouseEvent) => {
            if (e.buttons === this.RIGHT_CLICK){
                document.body.addEventListener("mousemove", this.rotateCamera, false);
                }
        });

        document.body.addEventListener("mouseup", (e: MouseEvent) => {
            if (e.buttons === this.RIGHT_CLICK){
                document.body.removeEventListener("mousemove", this.rotateCamera, false);
                }
        });
    }

    private moveCamera(e: KeyboardEvent): void {
        switch (e.key){
            case "w":
            this.render3d.translateCameraZAxis(-50);
            break;
            case "a":
            this.render3d.translateCameraXAxis(50);
            break;
            case "s":
            this.render3d.translateCameraZAxis(50);
            break;
            case "d":
            this.render3d.translateCameraXAxis(-50);
            break;
            default:
        }
    }

    private rotateCamera(e: MouseEvent): void {
        this.render3d.rotateCameraY(e.movementX);
        this.render3d.rotateCameraX(e.movementY);
    }
}
