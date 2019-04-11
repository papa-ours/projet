export interface ColorPalette {
    primary: string;
    secondary: string;
}

export interface ColorPreference {
    isDark: boolean;
    isTextWhite: boolean;
    palette: ColorPalette;
}

export const COLORS_PALETTES: ColorPalette[] = [
    {primary: "#379BFF", secondary: "#8AC4FF"},
    {primary: "#F4429B", secondary: "#D1297D"},
    {primary: "#F73D1D", secondary: "#FF6247"},
    {primary: "#FF8B1E", secondary: "#FFB049"},
    {primary: "#BEC619", secondary: "#F2FF00"},
    {primary: "#2CA02C", secondary: "#35D642"},
    {primary: "#9608CE", secondary: "#B826F2"},
    {primary: "#07C4BA", secondary: "#1AEFE4"},
];
