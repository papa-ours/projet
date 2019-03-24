import { TestBed } from "@angular/core/testing";
import { SocketService } from "./socket.service";

describe("SocketService", () => {
    let socketService: SocketService;
    beforeEach(() => {
        TestBed.configureTestingModule({

        });
        socketService = TestBed.get(SocketService);
    });

    it("should be created", () => {
        expect(socketService).toBeTruthy();
    });
});
