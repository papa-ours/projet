export interface ThematicObject {
    name: string;
    baseScale: number;
}

export const THEMATIC_OBJECTS: ThematicObject[] = [
    {name: "apple", baseScale: 0.8},
    {name: "calculator", baseScale: 5},
    {name: "coffeeMug", baseScale: 2},
    {name: "banana", baseScale: 0.5},
    {name: "book", baseScale: 6},
    {name: "stapler", baseScale: 1},
    {name: "scissors", baseScale: 10},
    {name: "can", baseScale: 8},
    {name: "pencils", baseScale: 10},
    {name: "car", baseScale: 0.5},
];

export enum ThematicObjectType {
    APPLE,
    CALCULATOR,
    COFFEE_MUG,
    BANANA,
    BOOK,
    STAPLER,
    SCISSORS,
    CAN,
    PENCILS,
    CAR,
}
