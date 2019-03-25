import { ElementRef } from "@angular/core";
import { TestBed } from "@angular/core/testing";
import * as THREE from "three";
import { RenderService } from "./render.service";

describe("RenderService", () => {

    let scene: THREE.Scene;
    let container: HTMLDivElement;
    let render: RenderService;
    let elementRef: ElementRef;
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                THREE.Scene,
                RenderService,
            ],
        });
        render = TestBed.get(RenderService);
        scene = TestBed.get(THREE.Scene);
        elementRef = new ElementRef(document.body);
        container = elementRef.nativeElement;
    });

    it("should be created", () => {
        const service: RenderService = TestBed.get(RenderService);
        expect(service).toBeTruthy();
    });
