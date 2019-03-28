import { ElementRef } from "@angular/core";
import { TestBed } from "@angular/core/testing";
import { PerspectiveCamera} from "three";
import { CameraMovementService } from "./camera-movement.service";
import { RenderService } from "./render.service";
describe("DeplacementCameraService", () => {

    let element: ElementRef;
    let renderOriginal: RenderService;
    let renderModified: RenderService;
    const DISTANCE: number = 10;
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                CameraMovementService,
                RenderService,
            ],
        });
        renderOriginal = TestBed.get(RenderService);
        renderModified = TestBed.get(RenderService);
        element = new ElementRef(document);
        CameraMovementService.setElementRef(element, element);
        CameraMovementService.setRender3dModifiedImage(renderOriginal);
        CameraMovementService.setRender3dOriginalImage(renderModified);

    });

    it("should change the speedZ on a w key press, keyup and keydown event", () => {
        const eventKeyDown: KeyboardEvent = new KeyboardEvent("keydown", {bubbles : true, cancelable : true, key : "w", shiftKey : false});
        const eventKeyUp: KeyboardEvent = new KeyboardEvent("keyup", {bubbles : true, cancelable : true, key : "w", shiftKey : false});
        CameraMovementService["setCameraSpeed"](eventKeyDown);
        expect(CameraMovementService.speedCamera.z).toBe(-DISTANCE);
        expect(CameraMovementService.speedCamera.x).toBe(0);
        CameraMovementService["setCameraSpeed"](eventKeyUp);
        expect(CameraMovementService.speedCamera.z).toBe(0);
        expect(CameraMovementService.speedCamera.x).toBe(0);
    });

    it("should change the speedZ on a s key press, keyup and keydown event", () => {
        const eventKeyDown: KeyboardEvent = new KeyboardEvent("keydown", {bubbles : true, cancelable : true, key : "s", shiftKey : false});
        const eventKeyUp: KeyboardEvent = new KeyboardEvent("keyup", {bubbles : true, cancelable : true, key : "s", shiftKey : false});
        CameraMovementService["setCameraSpeed"](eventKeyDown);
        expect(CameraMovementService.speedCamera.z).toBe(DISTANCE);
        expect(CameraMovementService.speedCamera.x).toBe(0);
        CameraMovementService["setCameraSpeed"](eventKeyUp);
        expect(CameraMovementService.speedCamera.z).toBe(0);
        expect(CameraMovementService.speedCamera.x).toBe(0);
    });

    it("should change the speedX on a a key press, keyup and keydown event", () => {
        const eventKeyDown: KeyboardEvent = new KeyboardEvent("keydown", {bubbles : true, cancelable : true, key : "a", shiftKey : false});
        const eventKeyUp: KeyboardEvent = new KeyboardEvent("keyup", {bubbles : true, cancelable : true, key : "a", shiftKey : false});
        CameraMovementService["setCameraSpeed"](eventKeyDown);
        expect(CameraMovementService.speedCamera.z).toBe(0);
        expect(CameraMovementService.speedCamera.x).toBe(-DISTANCE);
        CameraMovementService["setCameraSpeed"](eventKeyUp);
        expect(CameraMovementService.speedCamera.z).toBe(0);
        expect(CameraMovementService.speedCamera.x).toBe(0);
    });

    it("should change the speedX on a d key press, keyup and keydown event", () => {
        const eventKeyDown: KeyboardEvent = new KeyboardEvent("keydown", {bubbles : true, cancelable : true, key : "d", shiftKey : false});
        const eventKeyUp: KeyboardEvent = new KeyboardEvent("keyup", {bubbles : true, cancelable : true, key : "d", shiftKey : false});
        CameraMovementService["setCameraSpeed"](eventKeyDown);
        expect(CameraMovementService.speedCamera.z).toBe(0);
        expect(CameraMovementService.speedCamera.x).toBe(DISTANCE);
        CameraMovementService["setCameraSpeed"](eventKeyUp);
        expect(CameraMovementService.speedCamera.z).toBe(0);
        expect(CameraMovementService.speedCamera.x).toBe(0);
    });

    it("should change the speedX and speedZ on a w and d key press, keyup and keydown event", () => {
        const eventKeyDownD: KeyboardEvent = new KeyboardEvent("keydown", {bubbles : true, cancelable : true, key : "d", shiftKey : false});
        const eventKeyDownW: KeyboardEvent = new KeyboardEvent("keydown", {bubbles : true, cancelable : true, key : "w", shiftKey : false});
        const eventKeyUpD: KeyboardEvent = new KeyboardEvent("keyup", {bubbles : true, cancelable : true, key : "d", shiftKey : false});
        const eventKeyUpW: KeyboardEvent = new KeyboardEvent("keyup", {bubbles : true, cancelable : true, key : "w", shiftKey : false});
        CameraMovementService["setCameraSpeed"](eventKeyDownD);
        CameraMovementService["setCameraSpeed"](eventKeyDownW);
        expect(CameraMovementService.speedCamera.z).toBe(-DISTANCE);
        expect(CameraMovementService.speedCamera.x).toBe(DISTANCE);
        CameraMovementService["setCameraSpeed"](eventKeyUpD);
        CameraMovementService["setCameraSpeed"](eventKeyUpW);
        expect(CameraMovementService.speedCamera.z).toBe(0);
        expect(CameraMovementService.speedCamera.x).toBe(0);
    });

    it("should rotate the camera on the X axis when the user moves on the y axis", () => {
        renderOriginal.camera = new PerspectiveCamera();
        spyOn(renderOriginal, "rotateCameraX");
        const event1: MouseEvent = new MouseEvent("mousemove", {bubbles : true, cancelable : true, screenY : 50});
        CameraMovementService["rotateCamera"](event1);
        expect(renderOriginal.rotateCameraX).toHaveBeenCalled();
    });

    it("should rotate the camera on the y axis when the user moves on the x axis", () => {
        renderOriginal.camera = new PerspectiveCamera();
        spyOn(renderOriginal, "rotateCameraY");
        const event1: MouseEvent = new MouseEvent("mousemove", {bubbles : true, cancelable : true, screenX : 50});
        CameraMovementService["rotateCamera"](event1);
        expect(renderOriginal.rotateCameraY).toHaveBeenCalled();
    });

    it("should add the mousemove event listener when the user right click", () => {
        renderOriginal.camera = new PerspectiveCamera();
        spyOn(document.body, "addEventListener");
        const event1: MouseEvent = new MouseEvent("mousedown", {bubbles : true, cancelable : true, button : 2});
        CameraMovementService["onMouseClick"](event1);
        expect(document.body.addEventListener).toHaveBeenCalled();
    });

    it("should not add the mousemove event listener when the user left click", () => {
        renderOriginal.camera = new PerspectiveCamera();
        spyOn(document.body, "addEventListener");
        const event1: MouseEvent = new MouseEvent("mousedown", {bubbles : true, cancelable : true, button : 1});
        CameraMovementService["onMouseClick"](event1);
        expect(document.body.addEventListener).not.toHaveBeenCalled();
    });

    it("should remove the mousemove event when the user release the right click", () => {
        renderOriginal.camera = new PerspectiveCamera();
        spyOn(document.body, "removeEventListener");
        const event1: MouseEvent = new MouseEvent("mouseup", {bubbles : true, cancelable : true, button : 2});
        CameraMovementService["onMouseClick"](event1);
        expect(document.body.removeEventListener).toHaveBeenCalled();
    });

});
