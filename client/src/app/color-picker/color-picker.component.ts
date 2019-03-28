import { Component } from "@angular/core";
import { CookieService } from "ngx-cookie-service";

interface ColorPalette {
    primary: string;
    secondary: string;
}

interface ColorPreference {
    isDark: boolean;
    isTextWhite: boolean;
    palette: ColorPalette;
}

@Component({
    selector: "app-color-picker",
    templateUrl: "./color-picker.component.html",
    styleUrls: ["./color-picker.component.css"],
})
export class ColorPickerComponent {

    private readonly COOKIE_KEY: string = "color-palette";
    public colorPalettes: ColorPalette[];
    public isPanelShown: boolean;
    public isTextWhite: boolean;
    public isDarkTheme: boolean;
    private activeColorPreference: ColorPreference;

    public constructor(private cookieService: CookieService) {
        this.isPanelShown = false;
        this.colorPalettes = [
            {primary: "#379BFF", secondary: "#8AC4FF"},
            {primary: "#F4429B", secondary: "#D1297D"},
            {primary: "#F73D1D", secondary: "#FF6247"},
            {primary: "#FF8B1E", secondary: "#FFB049"},
            {primary: "#BEC619", secondary: "#F2FF00"},
            {primary: "#2CA02C", secondary: "#35D642"},
            {primary: "#9608CE", secondary: "#B826F2"},
            {primary: "#07C4BA", secondary: "#1AEFE4"},
        ];

        this.activeColorPreference = {
            palette: this.cookieService.check(this.COOKIE_KEY) ?
                JSON.parse(this.cookieService.get(this.COOKIE_KEY)).palette : this.colorPalettes[0],
            isDark: false,
            isTextWhite: true,
        };

        this.changeColor();
        this.changeTheme();
        this.changeTextColor();
    }

    public colorSelected(colorPalette: ColorPalette): void {
        this.activeColorPreference.palette = colorPalette;
        this.changeColor();

    }

    private changeColor(): void {
        const root: HTMLElement = this.getRoot();
        root.style.setProperty("--primary-color", this.activeColorPreference.palette.primary);
        root.style.setProperty("--secondary-color", this.activeColorPreference.palette.secondary);

        this.savePreference();
    }

    private savePreference(): void {
        this.cookieService.set(this.COOKIE_KEY, JSON.stringify(this.activeColorPreference));
    }

    public changePanelState(): void {
        this.isPanelShown = !this.isPanelShown;
    }

    public changeTheme(): void {
        this.activeColorPreference.isDark = !this.activeColorPreference.isDark;
        const root: HTMLElement = this.getRoot();
        this.changeHeaderColor(root);
        this.changeHeaderSecondaryColor(root);
        this.changeHeaderTextColor(root);

        this.savePreference();
    }

    private changeHeaderColor(root: HTMLElement): void {
        const headerColor: string = this.activeColorPreference.isDark ? "#332323" : "#DADADA";
        root.style.setProperty("--header-color", headerColor);
    }

    private changeHeaderTextColor(root: HTMLElement): void {
        const headerTextColor: string = this.activeColorPreference.isDark ? "#FFFFFF" : "#000000";
        root.style.setProperty("--header-text-color", headerTextColor);
    }

    private changeHeaderSecondaryColor(root: HTMLElement): void {
        const headerSecondaryColor: string = this.activeColorPreference.isDark ? "#404040" : "#CCCCCC";
        root.style.setProperty("--header-secondary-color", headerSecondaryColor);
    }

    public changeTextColor(): void {
        this.activeColorPreference.isTextWhite = !this.activeColorPreference.isTextWhite;
        const textColor: string = this.activeColorPreference.isTextWhite ? "#FFFFFF" : "#000000";
        this.getRoot().style.setProperty("--text-color", textColor);
    }

    private getRoot(): HTMLElement {
        return document.documentElement as HTMLElement;
    }
}
