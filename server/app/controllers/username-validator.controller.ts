import { NextFunction, Request, Response, Router } from "express";
import { inject, injectable } from "inversify";
import { Message } from "../../../common/communication/message";
import { DBConnectionService } from "../services/dbconnection.service";
import { UsernameValidatorService } from "../services/username-validator.service";
import Types from "../types";

@injectable()
export class UsernameValidatorController {

    public constructor(@inject(Types.UsernameValidatorService) private usernameValidatorService: UsernameValidatorService) { }

    public get router(): Router {
        const router: Router = Router();

        router.post(
            "/name",
            async (req: Request, res: Response, next: NextFunction) => {
                const message: Message = await this.usernameValidatorService.getUsernameValidation(req.body.name);

                if (message.body === "") {
                    const PREFIX: string = "/#";
                    DBConnectionService.getInstance().addUser({name: req.body.name, socketId: `${PREFIX}${req.body.socketId}`});
                }

                res.send(message);
            });

        router.delete(
            "/delete/:name",
            (req: Request, res: Response, next: NextFunction) => {
                DBConnectionService.getInstance().deleteUserByName(req.params.name);
                res.send();
            });

        return router;
    }
}
