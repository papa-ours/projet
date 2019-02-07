export interface ScoreInterface {
    username: string;
    minutes: number;
    seconds: number;
}

export interface TopScoresInterface {
    scoresStrings: string[];
}

export enum GameType {
    Solo,
    Pvp,
}

export interface GameSheetDescription {
    id: string;
    name: string;
    preview: string;
    topScores: TopScoresInterface[];
}

export interface GameLists {
    list2d: GameSheetDescription[];
    list3d: GameSheetDescription[];
}
