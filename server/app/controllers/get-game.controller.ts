import { NextFunction, Request, Response, Router } from "express";
import { injectable } from "inversify";

@injectable()
export class GetGameController {

    public constructor() { }

    public get router(): Router {
        const router: Router = Router();

        router.get("/:id",
                   (req: Request, res: Response, next: NextFunction) => {

                   });

        return router;
    }
}
