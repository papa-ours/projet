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
    public isPanelShown: boolean;

    public constructor() {
        this.isPanelShown = false;

        this.colorPalettes = [
            {primary: "#379BFF", secondary: "#8AC4FF"},
            {primary: "#03D300", secondary: "#12FF0F"},
            {primary: "#F73D1D", secondary: "#FF6247"},
            {primary: "#FF8B1E", secondary: "#FFB049"},
        ];
    }

    public colorSelected(colorPalette: ColorPalette): void {
        const root: HTMLElement = document.documentElement;
        root.style.setProperty("--primary-color", colorPalette.primary);
        root.style.setProperty("--secondary-color", colorPalette.secondary);
    }

    public changePanelState(): void {
        this.isPanelShown = !this.isPanelShown;
    }
}
