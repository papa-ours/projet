import { injectable, inject } from "inversify";
import { Router, Request, Response, NextFunction } from "express";

import Types from "./types";
import { UsernameValidator } from "./routes/username-validator";
import { GetGameList } from "./routes/get-game-list"

@injectable()
export class Routes {

    public constructor(
        @inject(Types.UsernameValidator) private usernameValidator: UsernameValidator,
        @inject(Types.GetGameList) private gameListGetter: GetGameList) {}

    public get routes(): Router {
        const router: Router = Router();

        router.get("/addUser/:username?",
            (req: Request, res: Response, next: NextFunction) => this.usernameValidator.getUsernameValidation(req, res));
        
        router.get("/deleteUser/:username?",
            (req: Request, res: Response, next: NextFunction) => this.usernameValidator.deleteUsername(req, res));

        router.get("/gameList",
            (req: Request, res: Response, next: NextFunction) => this.gameListGetter.sendGameList(req, res));

        return router;
    }
}
