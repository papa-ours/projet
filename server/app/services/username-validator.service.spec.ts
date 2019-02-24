import { expect } from "chai";
import { UsernameValidatorService } from "./username-validator.service";
import { UsersContainerService } from "./users-container.service";

describe("username validation", () => {
    const validator: UsernameValidatorService = new UsernameValidatorService();

    it("should return an empty message if the username is correct", async () => {
        const username: string = "correctName";
        const result: string = (await validator.getUsernameValidation(username)).body;

        expect(result).to.equals("");
    });

    it("should return the correct message if the server already has the username", async () => {
        const usersContainerService: UsersContainerService = new UsersContainerService();
        usersContainerService.addUser({name: "username", socketId: ""});
        const username: string = "username";
        const result: string = (await validator.getUsernameValidation(username)).body;
        usersContainerService.deleteUserByName("username");

        expect(result).to.equals("Le nom d'utilisateur existe déjà");
    });

    it("should return the correct message if the username is too short", async () => {
        const username: string = "A";
        const result: string = (await validator.getUsernameValidation(username)).body;

        expect(result).to.equals("Le nom d'utilisateur doit contenir entre 3 et 12 charactères");
    });

    it("should return the correct message if the username is too long", async () => {
        const username: string = "tooLongUsernamesAreForbidden";
        const result: string = (await validator.getUsernameValidation(username)).body;

        expect(result).to.equals("Le nom d'utilisateur doit contenir entre 3 et 12 charactères");
    });

    it("should return the correct message if the username contains forbidden characters", async () => {
        const username: string = "Username!";
        const result: string = (await validator.getUsernameValidation(username)).body;

        expect(result).to.equals("Le nom d'utilisateur doit contenir que des lettres et des chiffres");
    });
});
