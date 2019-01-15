import { Request, Response, NextFunction } from "express";
import { Message } from "../../../common/communication/message";
import "reflect-metadata";
import { injectable } from "inversify";

export module Route {

    @injectable() 
    export class UsernameValidator {

        private usernames: string[] = [];

        public addUser(username: string, req?: Request) : {isUsernameValid: boolean, errorMessage: string} {
            let usernameValidation = {isUsernameValid: true, errorMessage: ""}
            return usernameValidation;
        }

        private isAlphaNumeric(ch: string) : boolean {
            return true;
        }

        private validateUsername(username: string) : {isUsernameValid: boolean, errorMessage: string} {
            return {
                isUsernameValid: true,
                errorMessage: ""
            };
        }

        public getUsernameValidation(req: Request, res: Response, next: NextFunction): void {
            
        }
    }
}
