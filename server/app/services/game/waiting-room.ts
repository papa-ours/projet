import { GameType } from "../../../../common/communication/game-description";

export class WaitingRoom {
    public gameSheetId: string;

    public constructor(
        public name: string,
        public username: string,
        public type: GameType,
    ) {}
}
