import { NextFunction, Request, Response, Router } from "express";
import { inject, injectable } from "inversify";
import { GetGameList } from "./routes/get-game-list"
import Types from "./types";

@injectable()
export class Routes {

    public constructor(@inject(Types.GetGameList) private gameListGetter: GetGameList) {}

    public get routes(): Router {
        const router: Router = Router();

        router.get("/gameList",
                   (req: Request, res: Response, next: NextFunction) => this.gameListGetter.sendGameList(req, res));

        return router;
    }
}
