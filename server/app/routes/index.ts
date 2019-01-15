import { Request, Response, NextFunction } from "express";
import "reflect-metadata";
import { injectable } from "inversify";

export module Route {

    @injectable() 
    export class UsernameValidator {

        private usernames: string[] = [];

        public addUser(username: string, req?: Request) : {isUsernameValid: boolean, errorMessage: string} {
            let usernameValidation = this.validateUsername(username);

            if (usernameValidation.isUsernameValid) {
                this.usernames.push(username);
            }
            
            return usernameValidation;
        }

        private isAlphaNumeric(ch: string) : boolean {
            return ch.match(/^[a-z0-9]+$/i) !== null;
        }

        private validateUsername(username: string) : {isUsernameValid: boolean, errorMessage: string} {
            let errorMessage: string = "";
            let isUsernameValid: boolean = true;

            if (username.length > 16 || username.length < 3) {
                isUsernameValid = false;
                errorMessage = "Le nom d'utilisateur doit contenir entre 3 et 16 charactères";
            } else if (!this.isAlphaNumeric(username)) {
                isUsernameValid = false;
                errorMessage = "Le nom d'utilisateur doit contenir que des lettres et des chiffres";
            } else if (this.usernames.indexOf(username) !== -1) {
                isUsernameValid = false;
                errorMessage = "Le nom d'utilisateur existe déjà";
            }

            return {
                isUsernameValid: isUsernameValid,
                errorMessage: errorMessage
            };
        }

        public getUsernameValidation(req: Request, res: Response, next: NextFunction): void {
            
        }
    }
}
