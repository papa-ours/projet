import { expect } from "chai";
import { UsernameValidator } from "./username-validator";

describe("username validation", () => {
    let validator: UsernameValidator = new UsernameValidator();
    it("should return true if the username is Username", () => {
        let username = "Username";
        let result = validator.addUser(username).isUsernameValid;
        expect(result).to.equals(true);
    });

    it("should return an empty message if the username is correct", () => {
        let username = "correctName";
        let result = validator.addUser(username).errorMessage;
        expect(result).to.equals("");
    });

    it("should return false if the server already has the username", () => {
        let username = "Username";
        let result = validator.addUser(username).isUsernameValid;
        expect(result).to.equals(false);
    });

    it("should return the correct message if the server already has the username", () => {
        let username = "Username";
        let result = validator.addUser(username).errorMessage;
        expect(result).to.equals("Le nom d'utilisateur existe déjà");
    });
    
    it("should return false if the username is too short", () => {
        let username = "A";
        let result = validator.addUser(username).isUsernameValid;
        expect(result).to.equals(false);
    });

    it("should return the correct message if the username is too short", () => {
        let username = "A";
        let result = validator.addUser(username).errorMessage;
        expect(result).to.equals("Le nom d'utilisateur doit contenir entre 3 et 16 charactères");
    });

    it("should return false if the username is too long", () => {
        let username = "tooLongUsernameAreForbidden";
        let result = validator.addUser(username).isUsernameValid;
        expect(result).to.equals(false);
    });

    it("should return the correct message if the username is too long", () => {
        let username = "tooLongUsernameAreForbidden";
        let result = validator.addUser(username).errorMessage;
        expect(result).to.equals("Le nom d'utilisateur doit contenir entre 3 et 16 charactères");
    });

    it("should return false if the username contains forbidden characters", () => {
        let username = "Username!";
        let result = validator.addUser(username).isUsernameValid;
        expect(result).to.equals(false);
    });

    it("should return the correct message if the username contains forbidden characters", () => {
        let username = "Username!";
        let result = validator.addUser(username).errorMessage;
        expect(result).to.equals("Le nom d'utilisateur doit contenir que des lettres et des chiffres");
    });
});