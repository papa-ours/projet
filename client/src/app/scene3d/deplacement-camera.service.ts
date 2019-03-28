import { ElementRef } from "@angular/core";
import { RenderService } from "./render.service";
import * as THREE from "three";

interface RenderElement {
    elementRef: ElementRef;
    render: RenderService;
}

export class DeplacementCameraService {

    private static readonly RIGHT_CLICK: number = 2;
    private static readonly DISTANCE: number = 10;
    private static readonly FORWARD: string = "w";
    private static readonly LEFT: string = "a";
    private static readonly RIGHT: string = "d";
    private static readonly BACKWARD: string = "s";

    private static renderElementOriginal: RenderElement = { } as RenderElement;
    private static renderElementModified: RenderElement = { } as RenderElement;
    private speedCamera: THREE.Vector3;

    public static setElementRef(elementRefOriginal: ElementRef, elementRefModified: ElementRef): void {
        DeplacementCameraService.renderElementOriginal.elementRef = elementRefOriginal;
        DeplacementCameraService.renderElementModified.elementRef = elementRefModified;
    }

    public static setRender3dOriginalImage(renderService: RenderService): void {
        DeplacementCameraService.renderElementOriginal.render = renderService;
    }

    public static setRender3dModifiedImage(renderService: RenderService): void {
        DeplacementCameraService.renderElementModified.render = renderService;
    }

    public static activateMovement(): void {
        DeplacementCameraService.activateMovementKeyBoard();
        DeplacementCameraService.activateMovementMouse();
        setInterval(
            () => {
            DeplacementCameraService.forEachScene((render: RenderService) =>
                render.camera.translateZ(DeplacementCameraService.speedCamera.z),
            );
            DeplacementCameraService.forEachScene((render: RenderService) =>
                render.camera.translateX(DeplacementCameraService.speedCamera.x),
            );
        },  DeplacementCameraService.MOUVEMENT_INTERVAL);
    }

    private static activateMovementKeyBoard(): void {
        document.body.addEventListener("keypress", DeplacementCameraService.setCameraSpeed, false);
        document.body.addEventListener("keyup", DeplacementCameraService.resetCameraSpeed, false);
    }

    private static activateMovementMouse(): void {
        DeplacementCameraService.renderElementOriginal.elementRef.nativeElement.addEventListener(
            "mousedown",
            DeplacementCameraService.onMouseClick,
            false,
            );
        DeplacementCameraService.renderElementOriginal.elementRef.nativeElement.addEventListener(
            "mouseup",
            DeplacementCameraService.onMouseClick,
            false,
            );
        DeplacementCameraService.renderElementModified.elementRef.nativeElement.addEventListener(
            "mousedown",
            DeplacementCameraService.onMouseClick,
            false,
            );
        DeplacementCameraService.renderElementModified.elementRef.nativeElement.addEventListener(
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
                DeplacementCameraService.forEachScene((render: RenderService) => render.setSpeedZ(-DeplacementCameraService.DISTANCE));
                break;
            case DeplacementCameraService.LEFT:
                DeplacementCameraService.forEachScene((render: RenderService) => render.setSpeedX(-DeplacementCameraService.DISTANCE));
                break;
            case DeplacementCameraService.BACKWARD:
                DeplacementCameraService.forEachScene((render: RenderService) => render.setSpeedZ(DeplacementCameraService.DISTANCE));
                break;
            case DeplacementCameraService.RIGHT:
                DeplacementCameraService.forEachScene((render: RenderService) => render.setSpeedX(DeplacementCameraService.DISTANCE));
                break;
            default:
        }
    }

    private static resetCameraSpeed(keyEvent: KeyboardEvent): void {
        switch (keyEvent.key) {
            case DeplacementCameraService.FORWARD:
                DeplacementCameraService.forEachScene((render: RenderService) => render.setSpeedZ(0));
                break;
            case DeplacementCameraService.LEFT:
                DeplacementCameraService.forEachScene((render: RenderService) => render.setSpeedX(0));
                break;
            case DeplacementCameraService.BACKWARD:
                DeplacementCameraService.forEachScene((render: RenderService) => render.setSpeedZ(0));
                break;
            case DeplacementCameraService.RIGHT:
                DeplacementCameraService.forEachScene((render: RenderService) => render.setSpeedX(0));
                break;
            default:
        }
    }

    private static rotateCamera(mouseEvent: MouseEvent): void {
        DeplacementCameraService.forEachScene((render: RenderService) => render.rotateCameraX(mouseEvent.movementY));
        DeplacementCameraService.forEachScene((render: RenderService) => render.rotateCameraY(mouseEvent.movementX));
    }

    private static forEachScene(func: (render: RenderService) => void): void {
        func(DeplacementCameraService.renderElementOriginal.render);
        func(DeplacementCameraService.renderElementModified.render);
    }
}
