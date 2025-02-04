import { NextFunction, Request, Response, Router } from "express";
import { inject, injectable } from "inversify";
import { Message, MessageType } from "../../../common/communication/message";
import { UsernameValidatorService } from "../services/username-validator.service";
import { UsersContainerService } from "../services/users-container.service";
import Types from "../types";

@injectable()
export class UsernameController {

    public constructor(
        @inject(Types.UsernameValidatorService) private usernameValidatorService: UsernameValidatorService,
        @inject(Types.UsersContainerService) private usersContainerService: UsersContainerService) { }

    public get router(): Router {
        const router: Router = Router();

        router.post(
            "/name",
            async (req: Request, res: Response, next: NextFunction) => {
                const message: Message = await this.usernameValidatorService.getUsernameValidation(req.body.name);

                if (message.body === "") {
                    this.usersContainerService.addUser({name: req.body.name, socketId: `${req.body.socketId}`});
                }

                res.send(message);
            });

        router.delete(
            "/delete/:name",
            (req: Request, res: Response, next: NextFunction) => {
                this.usersContainerService.deleteUserByName(req.params.name);
                res.send();
            });

        router.get(
            "/id/:name",
            (req: Request, res: Response, next: NextFunction) => {
                res.send({
                    type: MessageType.USERNAME_VALIDATION,
                    body: this.usersContainerService.getSocketIdByUsername(req.params.name),
                });
            });

        router.get(
            "/name/:id",
            (req: Request, res: Response, next: NextFunction) => {
                res.send({
                    type: MessageType.USERNAME_VALIDATION,
                    body: this.usersContainerService.getUsernameBySocketId(req.params.id),
                });
            });

        return router;
    }
}
