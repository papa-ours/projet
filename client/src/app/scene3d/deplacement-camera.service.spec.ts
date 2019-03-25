import { ElementRef } from "@angular/core";
import { TestBed } from "@angular/core/testing";
import { DeplacementCameraService } from "./deplacement-camera.service";
import { RenderService } from "./render.service";
import { PerspectiveCamera}  from "three";
describe("DeplacementCameraService", () => {

    let element: ElementRef;
    let renderOriginal: RenderService;
    let renderModified: RenderService;
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                DeplacementCameraService,
                RenderService,
            ],
        });
        renderOriginal = TestBed.get(RenderService);
        renderModified = TestBed.get(RenderService);
        element = new ElementRef(document);
        DeplacementCameraService.setElementRef(element, element);
        DeplacementCameraService.setRender3dModifiedImage(renderOriginal);
        DeplacementCameraService.setRender3dOriginalImage(renderModified);

    });

    it("should change the speedZ on a w key press, keyup and keydown event", () => {
        const spy: jasmine.Spy = spyOn(renderOriginal, "setSpeedZ");
        const eventKeyDown: KeyboardEvent = new KeyboardEvent("keydown", {bubbles : true, cancelable : true, key : "w", shiftKey : false});
        const eventKeyUp: KeyboardEvent = new KeyboardEvent("keyup", {bubbles : true, cancelable : true, key : "w", shiftKey : false});
        DeplacementCameraService["setCameraSpeed"](eventKeyDown);
        expect(renderOriginal.setSpeedZ).toHaveBeenCalled();
        spy.calls.reset();
        DeplacementCameraService["setCameraSpeed"](eventKeyUp);
        expect(renderOriginal.setSpeedZ).toHaveBeenCalled();
    });

    it("should change the speedZ on a s key press, keyup and keydown event", () => {
        const spy: jasmine.Spy = spyOn(renderOriginal, "setSpeedZ");
        const eventKeyDown: KeyboardEvent = new KeyboardEvent("keydown", {bubbles : true, cancelable : true, key : "s", shiftKey : false});
        const eventKeyUp: KeyboardEvent = new KeyboardEvent("keyup", {bubbles : true, cancelable : true, key : "s", shiftKey : false});
        DeplacementCameraService["setCameraSpeed"](eventKeyDown);
        expect(renderOriginal.setSpeedZ).toHaveBeenCalled();
        spy.calls.reset();
        DeplacementCameraService["setCameraSpeed"](eventKeyUp);
        expect(renderOriginal.setSpeedZ).toHaveBeenCalled();
    });

    it("should change the speedX on a a key press, keyup and keydown event", () => {
        const spy: jasmine.Spy = spyOn(renderOriginal, "setSpeedX");
        const eventKeyDown: KeyboardEvent = new KeyboardEvent("keydown", {bubbles : true, cancelable : true, key : "a", shiftKey : false});
        const eventKeyUp: KeyboardEvent = new KeyboardEvent("keyup", {bubbles : true, cancelable : true, key : "a", shiftKey : false});
        DeplacementCameraService["setCameraSpeed"](eventKeyDown);
        expect(renderOriginal.setSpeedX).toHaveBeenCalled();
        spy.calls.reset();
        DeplacementCameraService["setCameraSpeed"](eventKeyUp);
        expect(renderOriginal.setSpeedX).toHaveBeenCalled();
    });

    it("should change the speedX on a d key press, keyup and keydown event", () => {
        const spy: jasmine.Spy = spyOn(renderOriginal, "setSpeedX");
        const eventKeyDown: KeyboardEvent = new KeyboardEvent("keydown", {bubbles : true, cancelable : true, key : "d", shiftKey : false});
        const eventKeyUp: KeyboardEvent = new KeyboardEvent("keyup", {bubbles : true, cancelable : true, key : "d", shiftKey : false});
        DeplacementCameraService["setCameraSpeed"](eventKeyDown);
        expect(renderOriginal.setSpeedX).toHaveBeenCalled();
        spy.calls.reset();
        DeplacementCameraService["setCameraSpeed"](eventKeyUp);
        expect(renderOriginal.setSpeedX).toHaveBeenCalled();
    });

    it("should change the speedX and speedZ on a w and d key press, keyup and keydown event", () => {
        spyOn(renderOriginal, "setSpeedX");
        spyOn(renderOriginal, "setSpeedZ");
        const event1: KeyboardEvent = new KeyboardEvent("keydown", {bubbles : true, cancelable : true, key : "d", shiftKey : false});
        const event2: KeyboardEvent = new KeyboardEvent("keydown", {bubbles : true, cancelable : true, key : "w", shiftKey : false});
        DeplacementCameraService["setCameraSpeed"](event1);
        DeplacementCameraService["setCameraSpeed"](event2);
        expect(renderOriginal.setSpeedX).toHaveBeenCalled();
        expect(renderOriginal.setSpeedZ).toHaveBeenCalled();
    });

    it("should rotate the camera on the X axis when the user moves on the y axis", () => {
        renderOriginal.camera = new PerspectiveCamera();
        spyOn(renderOriginal, "rotateCameraX");
        const event1: MouseEvent = new MouseEvent("mousemove", {bubbles : true, cancelable : true, screenY : 50});
        DeplacementCameraService["rotateCamera"](event1);
        expect(renderOriginal.rotateCameraX).toHaveBeenCalled();
    });

    it("should rotate the camera on the y axis when the user moves on the x axis", () => {
        renderOriginal.camera = new PerspectiveCamera();
        spyOn(renderOriginal, "rotateCameraY");
        const event1: MouseEvent = new MouseEvent("mousemove", {bubbles : true, cancelable : true, screenX : 50});
        DeplacementCameraService["rotateCamera"](event1);
        expect(renderOriginal.rotateCameraY).toHaveBeenCalled();
    });

    it("should add the mousemove event listener when the user right click", () => {
        renderOriginal.camera = new PerspectiveCamera();
        spyOn(document.body, "addEventListener");
        const event1: MouseEvent = new MouseEvent("mousedown", {bubbles : true, cancelable : true, button : 2});
        DeplacementCameraService["onMouseClick"](event1);
        expect(document.body.addEventListener).toHaveBeenCalled();
    });

    it("should not add the mousemove event listener when the user left click", () => {
        renderOriginal.camera = new PerspectiveCamera();
        spyOn(document.body, "addEventListener");
        const event1: MouseEvent = new MouseEvent("mousedown", {bubbles : true, cancelable : true, button : 1});
        DeplacementCameraService["onMouseClick"](event1);
        expect(document.body.addEventListener).not.toHaveBeenCalled();
    });

    it("should remove the mousemove event when the user release the right click", () => {
        renderOriginal.camera = new PerspectiveCamera();
        spyOn(document.body, "removeEventListener");
        const event1: MouseEvent = new MouseEvent("mouseup", {bubbles : true, cancelable : true, button : 2});
        DeplacementCameraService["onMouseClick"](event1);
        expect(document.body.removeEventListener).toHaveBeenCalled();
    });

});
