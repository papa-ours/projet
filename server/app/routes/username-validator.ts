import { Request, Response, NextFunction } from "express";
import "reflect-metadata";
import { injectable } from "inversify";
import { Message } from "../../../common/communication/message";

interface UsernameValidation {
    isUsernameValid: boolean, 
    errorMessage: string
};

@injectable() 
export class UsernameValidator {

    private usernames: string[] = [];

    public addUser(username: string, req?: Request) : UsernameValidation {
        let usernameValidation = this.validateUsername(username);

        if (usernameValidation.isUsernameValid) {
           this.usernames.push(username);
        }

        return usernameValidation;
    }

    private isAlphaNumeric(ch: string) : boolean {
        return ch.match(/^[a-z0-9]+$/i) !== null;
    }

    private validateUsername(username: string) : UsernameValidation {
        let validation : UsernameValidation = {
            isUsernameValid: true,
            errorMessage: ""
        };

        if (username == undefined || username.length > 16 || username.length < 3) {
            validation.isUsernameValid = false;
            validation.errorMessage = "Le nom d'utilisateur doit contenir entre 3 et 16 charactères";
        } else if (!this.isAlphaNumeric(username)) {
            validation.isUsernameValid = false;
            validation.errorMessage = "Le nom d'utilisateur doit contenir que des lettres et des chiffres";
        } else if (this.usernames.indexOf(username) !== -1) {
            validation.isUsernameValid = false;
            validation.errorMessage = "Le nom d'utilisateur existe déjà";
        }

        return validation;
    }

    public getUsernameValidation(req: Request, res: Response): void {
        let username = req.params.username;
        let usernameValidation = this.addUser(username, req);
    
        const message: Message = {
            title: "Username Validation",
            body: usernameValidation.errorMessage
        }
        res.send(JSON.stringify(message));
    }

    public deleteUsername(req: Request) : void {
        let username = req.params.username;
        let index = this.usernames.indexOf(username);
        if (index >= 0) {
            this.usernames.splice(index, 1);
        }
    }
}