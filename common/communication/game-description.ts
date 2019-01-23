
export interface GameSheetDescription {
    name: string;
    preview: string;
    topScoresSolo: string[];
    topScores1v1: string[];
}

export interface GameLists {
    list2d: GameSheetDescription[];
    list3d: GameSheetDescription[];
}