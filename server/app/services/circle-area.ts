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
export const CHUNK_RELATIVE_POSITION: Position[] = [
    {i: -3, j: -3 }, {i: -2, j: -3 }, {i: -1, j: -3 }, {i: 0, j: -3 }, {i: 1, j: -3 }, {i: 2, j: -3 }, {i: 3, j: -3 },
    {i: -3, j: -2 }, {i: -2, j: -2 }, {i: -1, j: -2 }, {i: 0, j: -2 }, {i: 1, j: -2 }, {i: 2, j: -2 }, {i: 3, j: -2 },
    {i: -3, j: -1 }, {i: -2, j: -1 }, {i: -1, j: -1 }, {i: 0, j: -1 }, {i: 1, j: -1 }, {i: 2, j: -1 }, {i: 3, j: -1 },
    {i: -3, j:  0 }, {i: -2, j:  0 }, {i: -1, j:  0 }, {i: 0, j:  0 }, {i: 1, j:  0 }, {i: 2, j:  0 }, {i: 3, j:  0 },
    {i: -3, j:  1 }, {i: -2, j:  1 }, {i: -1, j:  1 }, {i: 0, j:  1 }, {i: 1, j:  1 }, {i: 2, j:  1 }, {i: 3, j:  1 },
    {i: -3, j:  2 }, {i: -2, j:  2 }, {i: -1, j:  2 }, {i: 0, j:  2 }, {i: 1, j:  2 }, {i: 2, j:  2 }, {i: 3, j:  2 },
    {i: -3, j:  3 }, {i: -2, j:  3 }, {i: -1, j:  3 }, {i: 0, j:  3 }, {i: 1, j:  3 }, {i: 2, j:  3 }, {i: 3, j:  3 },
];
