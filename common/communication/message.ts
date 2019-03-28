export interface Message {
    type: MessageType;
    body: string;
}

export enum MessageType {
    USERNAME_VALIDATION,
    GAME_SHEET_GENERATION,
    SCENE_DATA,
    GAME_FREE_VIEW_GENERATION,
    SCORE_UPDATE,
}

export interface ChatMessage {
    chatTime: ChatTime;
    username: string;
    text: string;
}

export interface ChatTime {
    hours: number;
    minutes: string;
    seconds: string;
}
