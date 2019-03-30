import { GameType } from "../../../../common/communication/game-description";

export class WaitingRoom {
    public constructor(
        public gameSheetId: string,
        public username: string,
        public type: GameType,
    ) {
    }
}
