export interface ThematicObject {
    name: string;
    maxCount: number;
    baseScale: number;
}

export const THEMATIC_OBJECTS: ThematicObject[] = [
    {name: "apple", maxCount: 4, baseScale: 0.8},
    {name: "calculator", maxCount: 3, baseScale: 10},
    {name: "coffeeMug", maxCount: 10, baseScale: 3},
];

export enum ThematicObjectType {
    APPLE,
    CALCULATOR,
    COFFEE_MUG,
}
