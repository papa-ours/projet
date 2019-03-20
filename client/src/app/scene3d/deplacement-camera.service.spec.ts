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
                ElementRef,
            ],
        });
        render1 = TestBed.get(RenderService);
        render2 = TestBed.get(RenderService);
        element = new ElementRef(document.body);
        DeplacementCameraService.setElementRef(element, element);
        DeplacementCameraService.setRender3dModifiedImage(render1);
        DeplacementCameraService.setRender3dOriginalImage(render2);

    });

    it("", () => {
        DeplacementCameraService.activateMovement();
        const event = new KeyboardEvent("keydown", {bubbles : true, cancelable : true, key : "w", shiftKey : false});
        spyOn(render1, "setDeltaZ");
        DeplacementCameraService["setCameraSpeed"](event);
        expect(render1.setDeltaZ).toHaveBeenCalled();
    });
});
