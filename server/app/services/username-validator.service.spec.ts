import { expect } from "chai";
import { UsernameValidatorService } from "./username-validator.service";

describe("username validation", () => {
    const validator: UsernameValidatorService = new UsernameValidatorService();
    it("should return an empty message if the username is correct", () => {
        const username: string = "correctName";
        const users: string[] = [];
        const result: string = validator.getUsernameValidation(username, users).body;
        expect(result).to.equals("");
    });

    it("should return the correct message if the server already has the username", () => {
        const username: string = "username";
        const users: string[] = ["username"];
        const result: string = validator.getUsernameValidation(username, users).body;
        expect(result).to.equals("Le nom d'utilisateur existe déjà");
    });

    it("should return the correct message if the username is too short", () => {
        const username: string = "A";
        const users: string[] = [];
        const result: string = validator.getUsernameValidation(username, users).body;
        expect(result).to.equals("Le nom d'utilisateur doit contenir entre 3 et 12 charactères");
    });

    it("should return the correct message if the username is too long", () => {
        const username: string = "tooLongUsernamesAreForbidden";
        const users: string[] = [];
        const result: string = validator.getUsernameValidation(username, users).body;
        expect(result).to.equals("Le nom d'utilisateur doit contenir entre 3 et 12 charactères");
    });

    it("should return the correct message if the username contains forbidden characters", () => {
        const username: string = "Username!";
        const users: string[] = [];
        const result: string = validator.getUsernameValidation(username, users).body;
        expect(result).to.equals("Le nom d'utilisateur doit contenir que des lettres et des chiffres");
    });
});
