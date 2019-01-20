import { NextFunction, Request, Response, Router } from "express";
import { inject, injectable } from "inversify";
import { UsernameValidator } from "./routes/username-validator";
import Types from "./types";

@injectable()
export class Routes {

    public constructor(@inject(Types.UsernameValidator) private usernameValidator: UsernameValidator) {}

    public get routes(): Router {
        const router: Router = Router();

        router.get("/addUser/:username?",
                   (req: Request, res: Response, next: NextFunction) =>
                        this.usernameValidator.getUsernameValidation(req, res));

        router.get("/deleteUser/:username?",
                   (req: Request, res: Response, next: NextFunction) =>
                        this.usernameValidator.deleteUsername(req, res));

        return router;
    }
}
