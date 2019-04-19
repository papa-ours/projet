import { GameType } from "../../../common/communication/game-description";
import { container } from "../inversify.config";
import Types from "../types";
import { WaitingRoomService } from "./waiting-room.service";

describe("WaitingRoomService", () => {
    const waitingRoomService: WaitingRoomService = container.get<WaitingRoomService>(Types.WaitingRoomService);

    it("should resolve when creating a waiting room", (done: Mocha.Done) => {
        waitingRoomService.createWaitingRoom("voiture", "username", GameType.Simple)
            .then(() => {
                done();
            })
            .catch((error: Error) => console.error(error.message));
    });

    it("should resolve when joining a waitingRoom", (done: Mocha.Done) => {
        waitingRoomService.joinWaitingRoom("voiture", "username2", GameType.Simple)
            .then(() => {
                done();
            })
            .catch((error: Error) => console.error(error.message));
    });
});
