export interface TopScore {
    solo: string;
    pvp: string;
}

export interface GameSheetDescription {
    name: string;
    preview: string;
    topScores: TopScore[];
}

export interface GameLists {
    list2d: GameSheetDescription[];
    list3d: GameSheetDescription[];
}
