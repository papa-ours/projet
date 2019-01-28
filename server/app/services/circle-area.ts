import { Color } from "./enums";

export interface Position {
    i: number;
    j: number;
}

export const CHUNK_COLORS: number[] = [
    Color.White, Color.White, Color.Black, Color.Black, Color.Black, Color.White, Color.White,
    Color.White, Color.Black, Color.Black, Color.Black, Color.Black, Color.Black, Color.White,
    Color.Black, Color.Black, Color.Black, Color.Black, Color.Black, Color.Black, Color.Black,
    Color.Black, Color.Black, Color.Black, Color.Black, Color.Black, Color.Black, Color.Black,
    Color.Black, Color.Black, Color.Black, Color.Black, Color.Black, Color.Black, Color.Black,
    Color.White, Color.Black, Color.Black, Color.Black, Color.Black, Color.Black, Color.White,
    Color.White, Color.White, Color.Black, Color.Black, Color.Black, Color.White, Color.White,
];
