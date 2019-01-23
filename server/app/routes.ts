import { NextFunction, Request, Response, Router } from "express";
import { inject, injectable } from "inversify";
import { DifferenceImageGenerator } from "./routes/difference-image-generator";
import { GetGameList } from "./routes/get-game-list";
import { UsernameValidator } from "./routes/username-validator";
import Types from "./types";

@injectable()
export class Routes {

    public constructor(
        @inject(Types.UsernameValidator) private usernameValidator: UsernameValidator,
        @inject(Types.DifferenceImageGenerator) private differenceImageGenerator: DifferenceImageGenerator,
        @inject(Types.GetGameList) private gameListGetter: GetGameList) {}

    public get routes(): Router {
        const router: Router = Router();

        router.get("/addUser/:username?",
                   (req: Request, res: Response, next: NextFunction) =>
                        this.usernameValidator.getUsernameValidation(req, res));

        router.get("/deleteUser/:username?",
                   (req: Request, res: Response, next: NextFunction) =>
                        this.usernameValidator.deleteUsername(req, res));

        router.post("/diffImg",
                    (req: Request, res: Response, next: NextFunction) => {
                        this.differenceImageGenerator.generate(req, res);
                    });

        router.get("/gameList",
                   (req: Request, res: Response, next: NextFunction) =>
                        this.gameListGetter.sendGameList(req, res));

        return router;
    }
}
