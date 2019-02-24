import { expect } from "chai";
import { UsersContainerService } from "./users-container.service";

describe.only("UsersContainerService", () => {
    const usersContainerService: UsersContainerService = new UsersContainerService();
    const name: string = "test-user";
    const id: string = "test-id";

    it("should add the user properly", () => {
        usersContainerService.addUser({name: name, socketId: id});
        const result: string = UsersContainerService.usernames[0];

        expect(result).to.equals(name);
    });

    it("should clear the users properly", () => {
        UsersContainerService.clearUsers();
        const result: number = UsersContainerService.usernames.length;

        expect(result).to.equals(0);
    });
});
