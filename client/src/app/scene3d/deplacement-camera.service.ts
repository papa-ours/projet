import { ElementRef } from "@angular/core";
import { RenderService } from "./render.service";

export class DeplacementCameraService {

    private static readonly RIGHT_CLICK: number = 2;
    private static readonly DISTANCE: number = 10;
    private static readonly FORWARD: string = "w";
    private static readonly LEFT: string = "a";
    private static readonly RIGHT: string = "d";
    private static readonly BACKWARD: string = "s";

    private static elementRefOriginal: ElementRef;
    private static elementRefModified: ElementRef;
    public static render3dOriginalImage: RenderService;
    private static render3dModifiedImage: RenderService;

    public static setElementRef(elementRefOriginal: ElementRef, elementRefModified: ElementRef): void {
        DeplacementCameraService.elementRefOriginal = elementRefOriginal;
        DeplacementCameraService.elementRefModified = elementRefModified;
    }

    public static setRender3dOriginalImage(renderService: RenderService): void {
        DeplacementCameraService.render3dOriginalImage = renderService;
    }

    public static setRender3dModifiedImage(renderService: RenderService): void {
        DeplacementCameraService.render3dModifiedImage = renderService;
    }

    public static activateDeplacement(): void {
        document.body.addEventListener("keypress", DeplacementCameraService.moveCamera, false);
        document.body.addEventListener("keyup", DeplacementCameraService.resetCameraSpeed, false);

        DeplacementCameraService.elementRefOriginal.nativeElement.addEventListener("mousedown", (mouseEvent: MouseEvent) => {
            if (mouseEvent.button === this.RIGHT_CLICK) {
                document.body.addEventListener("mousemove", DeplacementCameraService.rotateCamera, false);
                }
        });

        DeplacementCameraService.elementRefOriginal.nativeElement.addEventListener("mouseup", (mouseEvent: MouseEvent) => {
            if (mouseEvent.button === this.RIGHT_CLICK) {
                document.body.removeEventListener("mousemove", DeplacementCameraService.rotateCamera, false);
                }
        });

        DeplacementCameraService.elementRefModified.nativeElement.addEventListener("mousedown", (mouseEvent: MouseEvent) => {
            if (mouseEvent.button === this.RIGHT_CLICK) {
                document.body.addEventListener("mousemove", DeplacementCameraService.rotateCamera, false);
                }
        });

        DeplacementCameraService.elementRefModified.nativeElement.addEventListener("mouseup", (mouseEvent: MouseEvent) => {
            if (mouseEvent.button === this.RIGHT_CLICK) {
                document.body.removeEventListener("mousemove", DeplacementCameraService.rotateCamera, false);
                }
        });
    }

    private static moveCamera(keyEvent: KeyboardEvent): void {
        switch (keyEvent.key) {
            case DeplacementCameraService.FORWARD:
            DeplacementCameraService.render3dOriginalImage.setDeltaZ(-DeplacementCameraService.DISTANCE);
            DeplacementCameraService.render3dModifiedImage.setDeltaZ(-DeplacementCameraService.DISTANCE);
            break;
            case DeplacementCameraService.LEFT:
            DeplacementCameraService.render3dOriginalImage.setDeltaX(-DeplacementCameraService.DISTANCE);
            DeplacementCameraService.render3dModifiedImage.setDeltaX(-DeplacementCameraService.DISTANCE);
            break;
            case DeplacementCameraService.BACKWARD:
            DeplacementCameraService.render3dOriginalImage.setDeltaZ(DeplacementCameraService.DISTANCE);
            DeplacementCameraService.render3dModifiedImage.setDeltaZ(DeplacementCameraService.DISTANCE);
            break;
            case DeplacementCameraService.RIGHT:
            DeplacementCameraService.render3dOriginalImage.setDeltaX(DeplacementCameraService.DISTANCE);
            DeplacementCameraService.render3dModifiedImage.setDeltaX(DeplacementCameraService.DISTANCE);
            break;
            default:
        }
    }

    private static resetCameraSpeed(keyEvent: KeyboardEvent): void {
        switch (keyEvent.key) {
            case DeplacementCameraService.FORWARD:
            DeplacementCameraService.render3dOriginalImage.setDeltaZ(0);
            DeplacementCameraService.render3dModifiedImage.setDeltaZ(0);
            break;
            case DeplacementCameraService.LEFT:
            DeplacementCameraService.render3dOriginalImage.setDeltaX(0);
            DeplacementCameraService.render3dModifiedImage.setDeltaX(0);
            break;
            case DeplacementCameraService.BACKWARD:
            DeplacementCameraService.render3dOriginalImage.setDeltaZ(0);
            DeplacementCameraService.render3dModifiedImage.setDeltaZ(0);
            break;
            case DeplacementCameraService.RIGHT:
            DeplacementCameraService.render3dOriginalImage.setDeltaX(0);
            DeplacementCameraService.render3dModifiedImage.setDeltaX(0);
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
