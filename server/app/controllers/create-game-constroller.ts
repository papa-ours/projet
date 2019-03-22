import { NextFunction, Request, Response, Router } from "express";
import { inject, injectable } from "inversify";
import { Message, MessageType } from "../../../common/communication/message";
import { DBConnectionService } from "../services/db-connection.service";
import { GetGameService } from "../services/get-game.service";
import Types from "../types";

@injectable()
export class CreateGameController {

    public constructor(
        @inject(Types.GetGameService) private getGameService: GetGameService,
        @inject(Types.DBConnectionService) private db: DBConnectionService) { }

    public get router(): Router {
        const router: Router = Router();

        router.get(
            "/:name/:type",
            async (req: Request, res: Response, next: NextFunction) => {
                const id: string = await this.getGameService.createGame(req.params.name, req.params.type);
                const message: Message = {
                    type: MessageType.GAME_SHEET_GENERATION,
                    body: JSON.stringify(id),
                };

                res.send(message);
            });

        router.delete(
            "/sheet/:id/:type",
            (req: Request, res: Response, next: NextFunction) => {
                this.db.connect().then(() => {
                    this.db.deleteGameSheet(req.params.id, req.params.type)
                    .then(() => {
                        res.send();
                        this.db.closeConnection();
                    });
                })
                .catch((error: Error) => console.error(error.message));
            });

        router.post(
            "/sheet/",
            (req: Request, res: Response, next: NextFunction) => {
                this.db.connect().then(() => {
                    this.db.reinitializeScores(req.body.id, req.body.type)
                    .then(() => {
                        this.db.closeConnection();
                        res.send();
                    });
                })
                .catch((error: Error) => console.error(error.message));
            });

        return router;
    }
}
