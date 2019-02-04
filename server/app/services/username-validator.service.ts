import { injectable } from "inversify";
import "reflect-metadata";
import { Message, MessageType } from "../../../common/communication/message";

@injectable()
export class UsernameValidatorService {
    private readonly MAX_LENGTH: number = 12;
    private readonly MIN_LENGTH: number = 3;

    private isAlphaNumeric(ch: string): boolean {
        return ch.match(/^\w*$/) !== null;
    }

    private validateUsername(username: string, users: string[]): string {
        let messageBody: string = "";

        const BASE_MESSAGE: string = "Le nom d'utilisateur ";
        if (username === undefined || username.length > this.MAX_LENGTH || username.length < this.MIN_LENGTH) {
            messageBody = BASE_MESSAGE.concat(`doit contenir entre ${this.MIN_LENGTH} et ${this.MAX_LENGTH} charactères`);
        } else if (!this.isAlphaNumeric(username)) {
            messageBody = BASE_MESSAGE.concat("doit contenir que des lettres et des chiffres");
        } else if (users.indexOf(username) !== -1) {
            messageBody = BASE_MESSAGE.concat("existe déjà");
        }

        return messageBody;
    }

    public getUsernameValidation(username: string, users: string[]): Message {
        const usernameValidation: string = this.validateUsername(username, users);

        return {
            type: MessageType.USERNAME_VALIDATION,
            body: usernameValidation,
        };
    }
}
