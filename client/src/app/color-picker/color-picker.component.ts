import { Component } from "@angular/core";

interface ColorPalette {
    primary: string;
    secondary: string;
}

@Component({
    selector: "app-color-picker",
    templateUrl: "./color-picker.component.html",
    styleUrls: ["./color-picker.component.css"],
})
export class ColorPickerComponent {

    public colorPalettes: ColorPalette[];
    public showPanel: boolean;

    public constructor() {
        this.showPanel = false;

        this.colorPalettes = [
            {primary: "#8AC4FF", secondary: "#379bff"},
            {primary: "#FF0000", secondary: "#379bff"},
            {primary: "#00FF00", secondary: "#379bff"},
            {primary: "#FFFF00", secondary: "#379bff"},
        ];
    }

    public colorSelected(colorPalette: ColorPalette): void {
        const root: HTMLElement = document.documentElement;
        root.style.setProperty("--primary-color", colorPalette.primary);
        root.style.setProperty("--secondary-color", colorPalette.secondary);
    }
}
