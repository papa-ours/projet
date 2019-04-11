import { Component } from "@angular/core";
import { faFont, faMoon, faPalette, IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { CookieService } from "ngx-cookie-service";
import { ColorPalette, ColorPreference, COLORS_PALETTES } from "./colors";

@Component({
    selector: "app-color-picker",
    templateUrl: "./color-picker.component.html",
    styleUrls: ["./color-picker.component.css"],
})
export class ColorPickerComponent {
    public readonly faFont: IconDefinition = faFont;
    public readonly faMoon: IconDefinition = faMoon;
    public readonly faPalette: IconDefinition = faPalette;
    private readonly COOKIE_KEY: string = "color-palette";
    public colorPalettes: ColorPalette[];
    public isPanelShown: boolean;
    public isTextWhite: boolean;
    public isDarkTheme: boolean;
    private activeColorPreference: ColorPreference;

    public constructor(private cookieService: CookieService) {
        this.isPanelShown = false;
        this.colorPalettes = COLORS_PALETTES;

        this.activeColorPreference = this.cookieService.check(this.COOKIE_KEY) ?
            JSON.parse(this.cookieService.get(this.COOKIE_KEY)) :
            {
                palette: this.colorPalettes[0],
                isDark: true,
                isTextWhite: true,
            };

        this.changeColor();
        this.showTheme();
        this.showTextColor();
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
        this.showTheme();
        this.savePreference();
    }

    private showTheme(): void {
        const root: HTMLElement = this.getRoot();
        this.changeHeaderColor(root);
        this.changeHeaderSecondaryColor(root);
        this.changeHeaderTextColor(root);
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
        this.showTextColor();
        this.savePreference();
    }

    private showTextColor(): void {
        const textColor: string = this.activeColorPreference.isTextWhite ? "#FFFFFF" : "#000000";
        this.getRoot().style.setProperty("--text-color", textColor);
    }

    private getRoot(): HTMLElement {
        return document.documentElement as HTMLElement;
    }
}
