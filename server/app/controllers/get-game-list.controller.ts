import { NextFunction, Request, Response, Router } from "express";
import { inject, injectable } from "inversify";
import { GetGameListService } from "../services/get-game-list.service";
import Types from "../types";

@injectable()
export class GetGameListController {

    public constructor(@inject(Types.GetGameListService) private getGameListService: GetGameListService) { }

    public get router(): Router {
        const router: Router = Router();

        router.get("/",
                   (req: Request, res: Response, next: NextFunction) => {
                       // Send the request to the service and send the response
                       res.send({
                           title: "get-game-list",
                           body: JSON.stringify(this.getGameListService.getGameList()),
                       });
                   });

        return router;
    }
}
