export interface ThematicObject {
    name: string;
    baseScale: number;
}

export const THEMATIC_OBJECTS: ThematicObject[] = [
    {name: "calculator", baseScale: 10},
    {name: "coffeeMug", baseScale: 3},
    {name: "banana", baseScale: 1},
];

export enum ThematicObjectType {
    CALCULATOR,
    COFFEE_MUG,
    BANANA,
}
