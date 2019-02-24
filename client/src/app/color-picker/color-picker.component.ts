import { Component } from "@angular/core";

interface ColorPalette {
    primary: string;
    secondary: string;
    text: string;
}

@Component({
    selector: "app-color-picker",
    templateUrl: "./color-picker.component.html",
    styleUrls: ["./color-picker.component.css"],
})
export class ColorPickerComponent {

    public colorPalettes: ColorPalette[];
    public isPanelShown: boolean;
    public isDarkTheme: boolean;

    public constructor() {
        this.isPanelShown = false;
        this.isDarkTheme = true;

        this.colorPalettes = [
            {primary: "#379BFF", secondary: "#8AC4FF", text: "#FFFFFF"},
            {primary: "#03D300", secondary: "#12FF0F", text: "#000000"},
            {primary: "#F73D1D", secondary: "#FF6247", text: "#FFFFFF"},
            {primary: "#FF8B1E", secondary: "#FFB049", text: "#FFFFFF"},
        ];

        this.colorSelected(this.colorPalettes[0]);
        this.changeTheme();
    }

    public colorSelected(colorPalette: ColorPalette): void {
        const root: HTMLElement = document.documentElement;
        root.style.setProperty("--primary-color", colorPalette.primary);
        root.style.setProperty("--secondary-color", colorPalette.secondary);
        root.style.setProperty("--text-color", colorPalette.text);
    }

    public changePanelState(): void {
        this.isPanelShown = !this.isPanelShown;
    }

    public changeTheme(): void {
        this.isDarkTheme = !this.isDarkTheme;
        const root: HTMLElement = document.documentElement;
        this.changeHeaderColor(root);
        this.changeHeaderSecondaryColor(root);
        this.changeHeaderTextColor(root);
    }

    private changeHeaderColor(root: HTMLElement): void {
        const headerColor: string = this.isDarkTheme ? "#332323" : "#DADADA";
        root.style.setProperty("--header-color", headerColor);
    }

    private changeHeaderTextColor(root: HTMLElement): void {
        const headerTextColor: string = this.isDarkTheme ? "#FFFFFF": "#000000";
        root.style.setProperty("--header-text-color", headerTextColor);
    }

    private changeHeaderSecondaryColor(root: HTMLElement): void {
        const headerSecondaryColor: string = this.isDarkTheme ? "#404040": "#CCCCCC";
        root.style.setProperty("--header-secondary-color", headerSecondaryColor);
    }
}
