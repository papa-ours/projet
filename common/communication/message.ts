export interface Message {
    type: MessageType;
    body: string;
}

export enum MessageType {
    USERNAME_VALIDATION,
    GAME_SHEET_GENERATION,
    SCENE_DATA,
    GAME_FREE_VIEW_GENERATION
}