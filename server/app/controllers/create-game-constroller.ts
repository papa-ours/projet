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
            "/:name/:type/:username",
            async (req: Request, res: Response, next: NextFunction) => {
                const id: string = await this.getGameService.createGame(req.params.name, req.params.type, req.params.username);
                const message: Message = {
                    type: MessageType.GAME_SHEET_GENERATION,
                    body: JSON.stringify(id),
                };

                res.send(message);
            });

        router.post(
            "/waitingRoom/create/",
            async (req: Request, res: Response, next: NextFunction) => {
                this.getGameService.createWaitingRoom(req.body.name, req.body.username, req.body.type);
                res.send();
            });

        router.post(
            "/waitingRoom/join/",
            async (req: Request, res: Response, next: NextFunction) => {
                this.getGameService.joinWaitingRoom(req.body.name, req.body.username, req.body.type);
                res.send();
            });

        router.delete(
            "/waitingRoom/:name/:username/:type",
            async (req: Request, res: Response, next: NextFunction) => {
                this.getGameService.deleteWaitingRoom(req.params.name, req.params.username, req.params.type);
                res.send();
            });

        router.delete(
            "/sheet/:id/:type",
            async (req: Request, res: Response, next: NextFunction) => {
                try {
                    await this.db.deleteGameSheet(req.params.id, req.params.type);
                    res.send();
                } catch (error) {
                    res.send(error);
                }
            });

        router.post(
            "/sheet/",
            (req: Request, res: Response, next: NextFunction) => {
                this.db.connect().then(async () => {
                    await this.db.reinitializeScores(req.body.id, req.body.type);
                    res.send();
                })
                .catch((error: Error) => console.error(error.message));
            });

        return router;
    }
}
