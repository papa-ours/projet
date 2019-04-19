import { ElementRef } from "@angular/core";
import * as THREE from "three";
import { CollisionDetectionService } from "./collision.service";
import { RenderService } from "./render.service";

interface RenderElement {
    elementRef: ElementRef;
    render: RenderService;
}
enum Movement {
    FORWARD = "w",
    LEFT = "a",
    RIGHT = "d",
    BACKWARD = "s",
}

export class CameraMovementService {

    private static readonly RIGHT_CLICK: number = 2;
    private static readonly DISTANCE: number = 5;
    private static readonly MOUVEMENT_INTERVAL: number = 10;
    private static readonly ROTATION_CONSTANT: number = 800;

    private static renderElementOriginal: RenderElement = { } as RenderElement;
    private static renderElementModified: RenderElement = { } as RenderElement;
    public static speedCamera: THREE.Vector3 = new THREE.Vector3(0, 0, 0);

    public static setElementRef(elementRefOriginal: ElementRef, elementRefModified: ElementRef): void {
        CameraMovementService.renderElementOriginal.elementRef = elementRefOriginal;
        CameraMovementService.renderElementModified.elementRef = elementRefModified;
    }

    public static setRender3dOriginalImage(renderService: RenderService): void {
        CameraMovementService.renderElementOriginal.render = renderService;
    }

    public static setRender3dModifiedImage(renderService: RenderService): void {
        CameraMovementService.renderElementModified.render = renderService;
    }

    public static activateMovement(): void {
        CameraMovementService.activateMovementKeyBoard();
        CameraMovementService.activateMovementMouse();
        setInterval(
            () => {
            if (CameraMovementService.canMove()) {
                CameraMovementService.forEachScene((render: RenderService) =>
                    render.camera.translateZ(CameraMovementService.speedCamera.z),
                );
                CameraMovementService.forEachScene((render: RenderService) =>
                    render.camera.translateX(CameraMovementService.speedCamera.x),
                );
            }
            },
            CameraMovementService.MOUVEMENT_INTERVAL,
        );
    }

    private static activateMovementKeyBoard(): void {
        document.body.addEventListener("keypress", CameraMovementService.setCameraSpeed, false);
        document.body.addEventListener("keyup", CameraMovementService.resetCameraSpeed, false);
    }

    private static activateMovementMouse(): void {
        CameraMovementService.renderElementOriginal.elementRef.nativeElement.addEventListener(
            "mousedown",
            CameraMovementService.onMouseClick,
        );
        CameraMovementService.renderElementOriginal.elementRef.nativeElement.addEventListener(
            "mouseup",
            CameraMovementService.onMouseClick,
        );
        CameraMovementService.renderElementModified.elementRef.nativeElement.addEventListener(
            "mousedown",
            CameraMovementService.onMouseClick,
        );
        CameraMovementService.renderElementModified.elementRef.nativeElement.addEventListener(
            "mouseup",
            CameraMovementService.onMouseClick,
        );
    }

    private static onMouseClick(mouseEvent: MouseEvent): void {
        if (mouseEvent.button === CameraMovementService.RIGHT_CLICK) {
            if (mouseEvent.type === "mousedown") {
                document.body.addEventListener("mousemove", CameraMovementService.rotateCamera, false);
            } else if (mouseEvent.type === "mouseup") {
                document.body.removeEventListener("mousemove", CameraMovementService.rotateCamera, false);
            }
        }
    }

    private static setCameraSpeed(keyEvent: KeyboardEvent): void {
        switch (keyEvent.key) {
            case Movement.FORWARD:
                CameraMovementService.speedCamera.setZ(-CameraMovementService.DISTANCE);
                break;
            case Movement.LEFT:
                CameraMovementService.speedCamera.setX(-CameraMovementService.DISTANCE);
                break;
            case Movement.BACKWARD:
                CameraMovementService.speedCamera.setZ(CameraMovementService.DISTANCE);
                break;
            case Movement.RIGHT:
                CameraMovementService.speedCamera.setX(CameraMovementService.DISTANCE);
                break;
            default:
        }
    }

    private static resetCameraSpeed(keyEvent: KeyboardEvent): void {
        switch (keyEvent.key) {
            case Movement.FORWARD:
                CameraMovementService.speedCamera.setZ(0);
                break;
            case Movement.LEFT:
                CameraMovementService.speedCamera.setX(0);
                break;
            case Movement.BACKWARD:
                CameraMovementService.speedCamera.setZ(0);
                break;
            case Movement.RIGHT:
                CameraMovementService.speedCamera.setX(0);
                break;
            default:
        }
    }

    private static rotateCamera(mouseEvent: MouseEvent): void {
        CameraMovementService.forEachScene((render: RenderService) =>
            render.camera.rotateX(mouseEvent.movementY / CameraMovementService.ROTATION_CONSTANT),
        );
        CameraMovementService.forEachScene((render: RenderService) =>
            render.camera.rotateY(mouseEvent.movementX / CameraMovementService.ROTATION_CONSTANT),
        );
    }

    private static forEachScene(func: (render: RenderService) => void): void {
        func(CameraMovementService.renderElementOriginal.render);
        func(CameraMovementService.renderElementModified.render);
    }

    private static canMove(): boolean {
        const originalRender: RenderService = CameraMovementService.renderElementOriginal.render;
        const modifiedRender: RenderService = CameraMovementService.renderElementModified.render;

        return CollisionDetectionService.canMove(originalRender.scene, originalRender.camera, CameraMovementService.speedCamera) &&
               CollisionDetectionService.canMove(modifiedRender.scene, modifiedRender.camera, CameraMovementService.speedCamera);
    }
}
