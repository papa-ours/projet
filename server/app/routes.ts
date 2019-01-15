import { injectable, inject } from "inversify";
import { Router, Request, Response, NextFunction } from "express";

import Types from "./types";
import { Route } from "./routes/index";

@injectable()
export class Routes {

    public constructor(@inject(Types.UsernameValidator) private usernameValidator: Route.UsernameValidator) {}

    public get routes(): Router {
        const router: Router = Router();

        router.get("/addUser/:username",
                    (req: Request, res: Response, next: NextFunction) => this.usernameValidator.getUsernameValidation(req, res, next));
        return router;
    }
}
