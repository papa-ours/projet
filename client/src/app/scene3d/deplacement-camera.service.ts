import { RenderService } from "./render.service";

export class DeplacementCameraService{

    public readonly RIGHT_CLICK: number = 2;
    private render3d: RenderService;

    public constructor(renderService: RenderService){
        this.render3d = renderService;
    }
    public keyPress(): void {

        document.body.addEventListener("keypress", (e: KeyboardEvent) => {
            switch (e.key){
                case "w":
                this.render3d.moveCamera(-50);
                break;
                case "s":
                this.render3d.moveCamera(50);
                break;
                default:
            }
        });

        document.body.addEventListener("mousedown", (e: MouseEvent) => {
            if (e.buttons === this.RIGHT_CLICK){
                document.body.addEventListener("mousemove", (e: MouseEvent) => {
                    this.render3d.rotateCameraY(e.movementX);
                    this.render3d.rotateCameraX(e.movementY);
                });
                }
        });

        document.body.addEventListener("mouseup", (e: MouseEvent) => {
            
        });
    }
}
