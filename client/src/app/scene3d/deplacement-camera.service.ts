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
    private static render3dOriginalImage: RenderService;
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

    public static activateMovement(): void {
        DeplacementCameraService.activateMovementKeyBoard();
        DeplacementCameraService.activateMovementMouse();
    }

    private static activateMovementKeyBoard(): void {
        document.body.addEventListener("keypress", DeplacementCameraService.setCameraSpeed, false);
        document.body.addEventListener("keyup", DeplacementCameraService.resetCameraSpeed, false);
    }

    private static activateMovementMouse(): void {
        DeplacementCameraService.elementRefOriginal.nativeElement.addEventListener(
            "mousedown",
            DeplacementCameraService.onMouseClick,
            false,
            );
        DeplacementCameraService.elementRefOriginal.nativeElement.addEventListener(
            "mouseup",
            DeplacementCameraService.onMouseClick,
            false,
            );
        DeplacementCameraService.elementRefModified.nativeElement.addEventListener(
            "mousedown",
            DeplacementCameraService.onMouseClick,
            false,
            );
        DeplacementCameraService.elementRefModified.nativeElement.addEventListener(
            "mouseup",
            DeplacementCameraService.onMouseClick,
            false);
    }

    private static onMouseClick(mouseEvent: MouseEvent): void {
        if (mouseEvent.button === DeplacementCameraService.RIGHT_CLICK) {
            if (mouseEvent.type === "mousedown") {
                document.body.addEventListener("mousemove", DeplacementCameraService.rotateCamera, false);
            } else if (mouseEvent.type === "mouseup") {
                document.body.removeEventListener("mousemove", DeplacementCameraService.rotateCamera, false);
            }
        }
    }

    private static setCameraSpeed(keyEvent: KeyboardEvent): void {
        switch (keyEvent.key) {
            case DeplacementCameraService.FORWARD:
                DeplacementCameraService.forEachScene((render: RenderService) => render.setDeltaZ(-DeplacementCameraService.DISTANCE));
                break;
            case DeplacementCameraService.LEFT:
                DeplacementCameraService.forEachScene((render: RenderService) => render.setDeltaX(-DeplacementCameraService.DISTANCE));
                break;
            case DeplacementCameraService.BACKWARD:
                DeplacementCameraService.forEachScene((render: RenderService) => render.setDeltaZ(DeplacementCameraService.DISTANCE));
                break;
            case DeplacementCameraService.RIGHT:
                DeplacementCameraService.forEachScene((render: RenderService) => render.setDeltaX(DeplacementCameraService.DISTANCE));
                break;
            default:
        }
    }

    private static resetCameraSpeed(keyEvent: KeyboardEvent): void {
        switch (keyEvent.key) {
            case DeplacementCameraService.FORWARD:
                DeplacementCameraService.forEachScene((render: RenderService) => render.setDeltaZ(0));
                break;
            case DeplacementCameraService.LEFT:
                DeplacementCameraService.forEachScene((render: RenderService) => render.setDeltaX(0));
                break;
            case DeplacementCameraService.BACKWARD:
                DeplacementCameraService.forEachScene((render: RenderService) => render.setDeltaZ(0));
                break;
            case DeplacementCameraService.RIGHT:
                DeplacementCameraService.forEachScene((render: RenderService) => render.setDeltaX(0));
                break;
            default:
        }
    }

    private static rotateCamera(e: MouseEvent): void {
        DeplacementCameraService.forEachScene((render: RenderService) => render.rotateCameraX(e.movementY));
        DeplacementCameraService.forEachScene((render: RenderService) => render.rotateCameraY(e.movementX));
    }

    private static forEachScene(func: (render: RenderService) => void): void {
        func(DeplacementCameraService.render3dOriginalImage);
        func(DeplacementCameraService.render3dModifiedImage);
    }
}
