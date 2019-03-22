export interface ThematicObject {
    name: string;
    maxCount: number;
    baseScale: number;
}

export const THEMATIC_OBJECTS: ThematicObject[] = [
    {name: "laptop", maxCount: 2, baseScale: 150},
    {name: "apple", maxCount: 4, baseScale: 0.8},
    {name: "calculator", maxCount: 3, baseScale: 10},
    {name: "coffeeMug", maxCount: 10, baseScale: 3},
    {name: "usbKey", maxCount: 10, baseScale: 0.01},
];
