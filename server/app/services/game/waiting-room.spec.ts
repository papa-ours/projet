import { expect } from "chai";
import { GameType } from "../../../../common/communication/game-description";
import { WaitingRoom } from "./waiting-room";

describe("Waiting Room", async () => {
    it("should add the user", () => {
        const waitingRoom: WaitingRoom = new WaitingRoom("1", "test", "user", GameType.Simple);
        waitingRoom.addUser("user2");

        expect(waitingRoom.usernames[1]).to.equals("user2");
    });
});
