import { NextFunction, Request, Response, Router } from "express";
import { inject, injectable } from "inversify";
import { UsernameValidatorService } from "../services/username-validator.service";
import Types from "../types";

@injectable()
export class UsernameValidatorController {

    public constructor(@inject(Types.UsernameValidatorService) private usernameValidatorService: UsernameValidatorService) { }

    public get router(): Router {
        const router: Router = Router();

        router.post(
            "/username",
            (req: Request, res: Response, next: NextFunction) => {
                res.send(this.usernameValidatorService.getUsernameValidation(req.body.name));
            });

        return router;
    }
}
