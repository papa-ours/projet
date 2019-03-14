import { RenderService } from "./render.service";

export class DeplacementCameraService {

    public static readonly RIGHT_CLICK: number = 2;
    private static readonly DISTANCE: number = 50;
    private static render3dOriginalImage: RenderService;
    private static render3dModifiedImage: RenderService;

    public static setRender3dOriginalImage(renderService: RenderService): void {
        DeplacementCameraService.render3dOriginalImage = renderService;
    }

    public static setRender3dModifiedImage(renderService: RenderService): void {
        DeplacementCameraService.render3dModifiedImage = renderService;
    }

    public static keyPress(): void {
        document.body.addEventListener("keypress", DeplacementCameraService.moveCamera, false);

        document.body.addEventListener("mousedown", (e: MouseEvent) => {
            if (e.button === this.RIGHT_CLICK) {
                document.body.addEventListener("mousemove", DeplacementCameraService.rotateCamera, false);
                }
        });

        document.body.addEventListener("mouseup", (e: MouseEvent) => {
            if (e.button === this.RIGHT_CLICK) {
                document.body.removeEventListener("mousemove", DeplacementCameraService.rotateCamera, false);
                }
        });
    }

    private static moveCamera(e: KeyboardEvent): void {
        switch (e.key) {
            case "w":
            DeplacementCameraService.render3dOriginalImage.translateCameraZAxis(-DeplacementCameraService.DISTANCE);
            DeplacementCameraService.render3dModifiedImage.translateCameraZAxis(-DeplacementCameraService.DISTANCE);
            break;
            case "a":
            DeplacementCameraService.render3dOriginalImage.translateCameraXAxis(-DeplacementCameraService.DISTANCE);
            DeplacementCameraService.render3dModifiedImage.translateCameraXAxis(-DeplacementCameraService.DISTANCE);
            break;
            case "s":
            DeplacementCameraService.render3dOriginalImage.translateCameraZAxis(DeplacementCameraService.DISTANCE);
            DeplacementCameraService.render3dModifiedImage.translateCameraZAxis(DeplacementCameraService.DISTANCE);
            break;
            case "d":
            DeplacementCameraService.render3dOriginalImage.translateCameraXAxis(DeplacementCameraService.DISTANCE);
            DeplacementCameraService.render3dModifiedImage.translateCameraXAxis(DeplacementCameraService.DISTANCE);
            break;
            default:
        }
    }

    private static rotateCamera(e: MouseEvent): void {
        DeplacementCameraService.render3dOriginalImage.rotateCameraY(e.movementX);
        DeplacementCameraService.render3dOriginalImage.rotateCameraX(e.movementY);
        DeplacementCameraService.render3dModifiedImage.rotateCameraY(e.movementX);
        DeplacementCameraService.render3dModifiedImage.rotateCameraX(e.movementY);
    }
}
