import { ElementRef } from "@angular/core";
import { TestBed } from "@angular/core/testing";
import { DeplacementCameraService } from "./deplacement-camera.service";
import { RenderService } from "./render.service";
import { PerspectiveCamera}  from "three";
describe("DeplacementCameraService", () => {

    let element: ElementRef;
    let render1: RenderService;
    let render2: RenderService;
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                DeplacementCameraService,
                RenderService,
            ],
        });
        render1 = TestBed.get(RenderService);
        render2 = TestBed.get(RenderService);
        element = new ElementRef(document);
        DeplacementCameraService.setElementRef(element, element);
        DeplacementCameraService.setRender3dModifiedImage(render1);
        DeplacementCameraService.setRender3dOriginalImage(render2);

    });

    it("should change the speedZ on a w key press", () => {
        spyOn(render1, "setSpeedZ");
        const event: KeyboardEvent = new KeyboardEvent("keydown", {bubbles : true, cancelable : true, key : "w", shiftKey : false});
        DeplacementCameraService["setCameraSpeed"](event);
        expect(render1.setSpeedZ).toHaveBeenCalled();
    });

    it("should change the speedZ on a s key press", () => {
        spyOn(render1, "setSpeedZ");
        const event: KeyboardEvent = new KeyboardEvent("keydown", {bubbles : true, cancelable : true, key : "s", shiftKey : false});
        DeplacementCameraService["setCameraSpeed"](event);
        expect(render1.setSpeedZ).toHaveBeenCalled();
    });

    it("should change the speedX on a a key press", () => {
        spyOn(render1, "setSpeedX");
        const event: KeyboardEvent = new KeyboardEvent("keydown", {bubbles : true, cancelable : true, key : "a", shiftKey : false});
        DeplacementCameraService["setCameraSpeed"](event);
        expect(render1.setSpeedX).toHaveBeenCalled();
    });

    it("should change the speedX on a d key press", () => {
        spyOn(render1, "setSpeedX");
        const event: KeyboardEvent = new KeyboardEvent("keydown", {bubbles : true, cancelable : true, key : "d", shiftKey : false});
        DeplacementCameraService["setCameraSpeed"](event);
        expect(render1.setSpeedX).toHaveBeenCalled();
    });

    it("should change the speedX and speedZ on a w and d key press", () => {
        spyOn(render1, "setSpeedX");
        spyOn(render1, "setSpeedZ");
        const event1: KeyboardEvent = new KeyboardEvent("keydown", {bubbles : true, cancelable : true, key : "d", shiftKey : false});
        const event2: KeyboardEvent = new KeyboardEvent("keydown", {bubbles : true, cancelable : true, key : "w", shiftKey : false});
        DeplacementCameraService["setCameraSpeed"](event1);
        DeplacementCameraService["setCameraSpeed"](event2);
        expect(render1.setSpeedX).toHaveBeenCalled();
        expect(render1.setSpeedZ).toHaveBeenCalled();
    });

    it("should rotate the camera on the X axis when the user moves on the y axis", () => {
        render1.camera = new PerspectiveCamera();
        spyOn(render1, "rotateCameraX");
        const event1: MouseEvent = new MouseEvent("mousemove", {bubbles : true, cancelable : true, screenY : 50});
        DeplacementCameraService["rotateCamera"](event1);
        expect(render1.rotateCameraX).toHaveBeenCalled();
    });

    it("should rotate the camera on the y axis when the user moves on the x axis", () => {
        render1.camera = new PerspectiveCamera();
        spyOn(render1, "rotateCameraY");
        const event1: MouseEvent = new MouseEvent("mousemove", {bubbles : true, cancelable : true, screenX : 50});
        DeplacementCameraService["rotateCamera"](event1);
        expect(render1.rotateCameraY).toHaveBeenCalled();
    });

    it("should add the mousemove event listener when the user right click", () => {
        render1.camera = new PerspectiveCamera();
        spyOn(document.body, "addEventListener");
        const event1: MouseEvent = new MouseEvent("mousedown", {bubbles : true, cancelable : true, button : 2});
        DeplacementCameraService["onMouseClick"](event1);
        expect(document.body.addEventListener).toHaveBeenCalled();
    });

    it("should not add the mousemove event listener when the user left click", () => {
        render1.camera = new PerspectiveCamera();
        spyOn(document.body, "addEventListener");
        const event1: MouseEvent = new MouseEvent("mousedown", {bubbles : true, cancelable : true, button : 1});
        DeplacementCameraService["onMouseClick"](event1);
        expect(document.body.addEventListener).not.toHaveBeenCalled();
    });

    it("should remove the mousemove event when the user release the right click", () => {
        render1.camera = new PerspectiveCamera();
        spyOn(document.body, "removeEventListener");
        const event1: MouseEvent = new MouseEvent("mouseup", {bubbles : true, cancelable : true, button : 2});
        DeplacementCameraService["onMouseClick"](event1);
        expect(document.body.removeEventListener).toHaveBeenCalled();
    });
});
