import { Request, Response } from "express";
import "reflect-metadata";
import { injectable } from "inversify";
import { Message } from "../../../common/communication/message";

@injectable() 
export class GetGameList {

    public getUsernameValidation(req: Request, res: Response): void {
        let username = req.params.username;
        let usernameValidation = this.addUser(username, req);
    
        const message: Message = {
            title: "Username Validation",
            body: usernameValidation.errorMessage
        }
        res.send(JSON.stringify(message));
    }

    public deleteUsername(req: Request, res: Response) : void {
        let username = req.params.username;
        let index = this.usernames.indexOf(username);
        let usernameDeleted: boolean = false;
        if (index >= 0) {
            usernameDeleted = true;
            this.usernames.splice(index, 1);
        }

        const message: Message = {
            title: "Username Deletion : " + username,
            body: usernameDeleted.toString()
        }
        res.send(JSON.stringify(message));
    }
}