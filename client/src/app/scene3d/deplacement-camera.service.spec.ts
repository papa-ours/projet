import { ElementRef } from "@angular/core";
import { TestBed } from "@angular/core/testing";
import { DeplacementCameraService } from "./deplacement-camera.service";
import { RenderService } from "./render.service";

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

});
