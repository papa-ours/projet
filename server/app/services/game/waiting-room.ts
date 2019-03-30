import { GameType } from "../../../../common/communication/game-description";
import { Socket } from "../../socket";

export class WaitingRoom {
    public constructor(
        public gameSheetId: string,
        public username: string,
        public type: GameType,
    ) {
        Socket.io.emit(`GameCreated-${this.gameSheetId}`);
    }
}
