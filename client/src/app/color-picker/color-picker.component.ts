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
    public isTextWhite: boolean;
    public isDarkTheme: boolean;

    public constructor() {
        this.isPanelShown = false;
        this.isDarkTheme = true;

        this.colorPalettes = [
            {primary: "#379BFF", secondary: "#8AC4FF"},
            {primary: "#F4429B", secondary: "#D1297D"},
            {primary: "#F73D1D", secondary: "#FF6247"},
            {primary: "#FF8B1E", secondary: "#FFB049"},
        ];

        this.colorSelected(this.colorPalettes[0]);
        this.changeTheme();
        this.changeTextColor();
    }

    public colorSelected(colorPalette: ColorPalette): void {
        const root: HTMLElement = this.getRoot();
        root.style.setProperty("--primary-color", colorPalette.primary);
        root.style.setProperty("--secondary-color", colorPalette.secondary);
    }

    public changePanelState(): void {
        this.isPanelShown = !this.isPanelShown;
    }

    public changeTheme(): void {
        this.isDarkTheme = !this.isDarkTheme;
        const root: HTMLElement = this.getRoot();
        this.changeHeaderColor(root);
        this.changeHeaderSecondaryColor(root);
        this.changeHeaderTextColor(root);
    }

    private changeHeaderColor(root: HTMLElement): void {
        const headerColor: string = this.isDarkTheme ? "#332323" : "#DADADA";
        root.style.setProperty("--header-color", headerColor);
    }

    private changeHeaderTextColor(root: HTMLElement): void {
        const headerTextColor: string = this.isDarkTheme ? "#FFFFFF" : "#000000";
        root.style.setProperty("--header-text-color", headerTextColor);
    }

    private changeHeaderSecondaryColor(root: HTMLElement): void {
        const headerSecondaryColor: string = this.isDarkTheme ? "#404040" : "#CCCCCC";
        root.style.setProperty("--header-secondary-color", headerSecondaryColor);
    }

    public changeTextColor(): void {
        this.isTextWhite = !this.isTextWhite;
        const textColor: string = this.isTextWhite ? "#FFFFFF" : "#000000";
        this.getRoot().style.setProperty("--text-color", textColor);
    }

    private getRoot(): HTMLElement {
        return document.documentElement as HTMLElement;
    }
}
