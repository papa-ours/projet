// import { expect } from "chai";
import { GameType } from "../../../common/communication/game-description";
import { container } from "../inversify.config";
import Types from "../types";
import { WaitingRoomService } from "./waiting-room.service";

describe.only("WaitingRoomService", () => {
    const waitingRoomService: WaitingRoomService = container.get<WaitingRoomService>(Types.WaitingRoomService);

    it("should resolve when creating a waiting room", (done: Mocha.Done) => {
        waitingRoomService.createWaitingRoom("voiture", "username", GameType.Simple)
            .then(() => {
                done();
            });
    });
});
