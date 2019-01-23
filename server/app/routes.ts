import { NextFunction, Request, Response, Router } from "express";
import { inject, injectable } from "inversify";
import { GetGameList } from "./routes/get-game-list";
import Types from "./types";
import { DifferenceImageGenerator } from "./routes/difference-image-generator";

@injectable()
export class Routes {

    public constructor(
        @inject(Types.DifferenceImageGenerator) private differenceImageGenerator: DifferenceImageGenerator,
        @inject(Types.GetGameList) private gameListGetter: GetGameList) {}

    public get routes(): Router {
        const router: Router = Router();

        router.get("/gameList",
                   (req: Request, res: Response, next: NextFunction) => this.gameListGetter.sendGameList(req, res));

        router.post("/diffImg",
                    (req: Request, res: Response, next: NextFunction) => {
                        this.differenceImageGenerator.generate(req, res);
                    });

        return router;
    }
}
