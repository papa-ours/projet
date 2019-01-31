import { NextFunction, Request, Response, Router } from "express";
import { inject, injectable } from "inversify";
import { DifferenceImageGenerator } from "../services/difference-image-generator.service";
import Types from "../types";

@injectable()
export class GameSheetGenerationController {

    public constructor(@inject(Types.DifferenceImageGenerator) private differenceImageGenerator: DifferenceImageGenerator) { }

    public get router(): Router {
        const router: Router = Router();

        router.post("/",
                    (req: Request, res: Response, next: NextFunction) =>
                        this.differenceImageGenerator.generate(req, res));

        return router;
    }
}
