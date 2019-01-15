import { Request, Response, NextFunction } from "express";
import "reflect-metadata";
import { injectable } from "inversify";

export module Route {

    @injectable() 
    export class UsernameValidator {

        public addUser(username: string, req?: Request) : {isUsernameValid: boolean, errorMessage: string} {
            let usernameValidation = this.validateUsername(username);
            return usernameValidation;
        }

        private isAlphaNumeric(ch: string) : boolean {
            return true;
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
