import { expect } from "chai";
import { UsersContainerService } from "./users-container.service";

describe("UsersContainerService", () => {
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

    it("should delete the user by name if he exists", () => {
        usersContainerService.addUser({name: name, socketId: id});
        usersContainerService.deleteUserByName(name);
        const result: number = UsersContainerService.usernames.length;

        expect(result).to.equals(0);
    });

    it("should delete the user by id if he exists", () => {
        usersContainerService.addUser({name: name, socketId: id});
        usersContainerService.deleteUserById(id);
        const result: number = UsersContainerService.usernames.length;

        expect(result).to.equals(0);
    });
});
