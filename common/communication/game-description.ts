export interface ScoreInterface {
    username: string;
    minutes: number;
    seconds: number;
}

export interface TopScoresInterface {
    scoresStrings: string[];
}

export enum GameType {
    Simple,
    Free,
}

export enum GameMode {
    Solo = "solo",
    Pvp = "pvp",
}

export interface GameSheetDescription {
    id: string;
    name: string;
    preview: string;
    topScores: TopScoresInterface[];
}

export interface HasId {
    id: string;
}

export interface GameSheet extends HasId {
    id: string;
    name: string;
    topScores: TopScoresInterface[];
    hasWaitingRoom?: boolean;
}

export interface GameLists {
    list2d: GameSheet[];
    list3d: GameSheet[];
}
