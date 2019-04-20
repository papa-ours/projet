import { TestBed } from "@angular/core/testing";
import { GameMode } from "../../../common/communication/game-description";
import { SocketService } from "./socket.service";

describe("SocketService", () => {
    let socketService: SocketService;
    beforeEach(() => {
        TestBed.configureTestingModule({

        });
        socketService = TestBed.get(SocketService);
    });

    it("should be created", () => {
        expect(socketService).toBeDefined();
    });

    it("should emit new user on new user", () => {
        spyOn(socketService["socket"], "emit");
        socketService.sendNewUserMessage();
        expect(socketService["socket"].emit).toHaveBeenCalled();

    });
    it("should emit found difference on found difference", () => {
        spyOn(socketService["socket"], "emit");
        socketService.sendFoundDiffrenceMessage("test", GameMode.Solo);
        expect(socketService["socket"].emit).toHaveBeenCalledWith("foundDifference","test",GameMode.Solo);
    });
    it("should emit error identification on error identification", () => {
        spyOn(socketService["socket"], "emit");
        socketService.sendErrorIdentificationMessage("test", GameMode.Solo);
        expect(socketService["socket"].emit).toHaveBeenCalledWith("errorIdentification","test",GameMode.Solo);
    });
});
