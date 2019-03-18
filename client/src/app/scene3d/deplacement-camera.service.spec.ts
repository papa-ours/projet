import { TestBed } from "@angular/core/testing";
import { DeplacementCameraService } from "./deplacement-camera.service";
import { ElementRef, Injectable } from "@angular/core";
import { RenderService } from "./render.service";

@Injectable()
export class MockElementRef {
  public nativeElement: {};
}

describe("DeplacementCameraService", () => {

    let element: ElementRef;
    let render1: RenderService;
    let render2: RenderService;
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                DeplacementCameraService,
                RenderService,
                {provide: ElementRef, useClass: MockElementRef},
            ],
        });
        render1 = TestBed.get(RenderService);
        render2 = TestBed.get(RenderService);
        element = new ElementRef(document.body);
        //element = TestBed.get(ElementRef);
        DeplacementCameraService.setElementRef(element, element);
        DeplacementCameraService.setRender3dModifiedImage(render1);
        DeplacementCameraService.setRender3dOriginalImage(render2);

    });

     it("", () => {
        console.log(render1);
        DeplacementCameraService.activateDeplacement();
        var e = new KeyboardEvent("keydown", {bubbles : true, cancelable : true, key : "w", shiftKey : false});
        spyOn(render1,"setDeltaZ");
        DeplacementCameraService["moveCamera"](e);
        console.log(render1);
        expect(render1.setDeltaZ).toHaveBeenCalled();

     });

    /*it("should set ", () => {
        spyOnProperty(DeplacementCameraService, "setElementRef", "set");
        DeplacementCameraService.setElementRef = element, element;

    });*/

});
