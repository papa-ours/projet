import { injectable } from "inversify";
import { Message } from "../../../common/communication/message";

import { Request, Response } from "express";
import "reflect-metadata";

interface UsernameValidation {
    isUsernameValid: boolean;
    errorMessage: string;
}

@injectable()
export class UsernameValidator {

    private usernames: string[] = [];
    private readonly MAX_LENGTH: number = 16;
    private readonly MIN_LENGTH: number = 3;

    public addUser(username: string, req?: Request): UsernameValidation {
        const usernameValidation: UsernameValidation =
            this.validateUsername(username);

        if (usernameValidation.isUsernameValid) {
           this.usernames.push(username);
        }

        return usernameValidation;
    }

    private isAlphaNumeric(ch: string): boolean {
        return ch.match(/^[a-z0-9]+$/i) !== null;
    }

    private validateUsername(username: string): UsernameValidation {
        const validation: UsernameValidation = {
            isUsernameValid: true,
            errorMessage: "",
        };

        const BASE_MESSAGE: string = "Le nom d'utilisateur ";
        if (username === undefined || username.length > this.MAX_LENGTH || username.length < this.MIN_LENGTH) {
            validation.isUsernameValid = false;
            validation.errorMessage += BASE_MESSAGE.concat(`doit contenir entre ${this.MIN_LENGTH}
                                         et ${this.MAX_LENGTH} charactères`);
        } else if (!this.isAlphaNumeric(username)) {
            validation.isUsernameValid = false;
            validation.errorMessage += BASE_MESSAGE.concat("doit contenir que des lettres et des chiffres");
        } else if (this.usernames.indexOf(username) !== -1) {
            validation.isUsernameValid = false;
            validation.errorMessage += BASE_MESSAGE.concat("existe déjà");
        }

        return validation;
    }

    public getUsernameValidation(req: Request, res: Response): void {
        const username: string = req.params.username;
        const usernameValidation: UsernameValidation = this.addUser(username, req);

        const message: Message = {
            title: "Username Validation",
            body: usernameValidation.errorMessage,
        };
        res.send(message);
    }

    public deleteUsername(req: Request, res: Response): void {
        const username: string = req.params.username;
        const index: number = this.usernames.indexOf(username);
        let usernameDeleted: boolean = false;
        if (index >= 0) {
            usernameDeleted = true;
            this.usernames.splice(index, 1);
        }

        const message: Message = {
            title: "Username Deletion : " + username,
            body: usernameDeleted.toString(),
        };
        res.send(JSON.stringify(message));
    }
}
