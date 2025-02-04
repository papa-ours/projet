import { NextFunction, Request, Response, Router } from "express";
import { inject, injectable } from "inversify";
import { GameType } from "../../../common/communication/game-description";
import { Message, MessageType } from "../../../common/communication/message";
import { DBConnectionService } from "../services/db-connection.service";
import { GetGameService } from "../services/get-game.service";
import { WaitingRoomService } from "../services/waiting-room.service";
import { Socket } from "../socket";
import Types from "../types";

@injectable()
export class CreateGameController {

    public constructor(
        @inject(Types.GetGameService) private getGameService: GetGameService,
        @inject(Types.WaitingRoomService) private waitingRoomService: WaitingRoomService,
        @inject(Types.DBConnectionService) private db: DBConnectionService) { }

    public get router(): Router {
        const router: Router = Router();

        router.get(
            "/id/:name/:type/:mode/:usernames",
            async (req: Request, res: Response, next: NextFunction) => {
                const id: string | void = await this.getGameService
                    .createGame(req.params.name, req.params.type, req.params.mode, JSON.parse(req.params.usernames))
                        .catch((error: Error) => console.error(error.message));
                const message: Message = {
                    type: MessageType.GAME_SHEET_GENERATION,
                    body: JSON.stringify(id),
                };

                res.send(message);
            });

        router.get(
            "/sheet/id/:name/:type",
            async (req: Request, res: Response, next: NextFunction) => {
                const id: string = await this.getGameService.getSheetId(req.params.name, req.params.type);

                res.send({
                    type: MessageType.GAME_SHEET_GENERATION,
                    body: id,
                });
            });

        router.post(
            "/waitingRoom/create/",
            async (req: Request, res: Response, next: NextFunction) => {
                await this.waitingRoomService.createWaitingRoom(req.body.name, req.body.username, req.body.type)
                    .catch((error: Error) => console.error(error.message));
                res.send();
            });

        router.get(
            "/waitingRoom/listAll",
            (req: Request, res: Response, next: NextFunction) => {
                res.send(WaitingRoomService.waitingRooms);
            });

        router.post(
            "/waitingRoom/join/",
            async (req: Request, res: Response, next: NextFunction) => {
                await this.waitingRoomService.joinWaitingRoom(req.body.name, req.body.username, req.body.type)
                    .catch((error: Error) => console.error(error.message));
                res.send();
            });

        router.delete(
            "/waitingRoom/:name/:username/:type",
            async (req: Request, res: Response, next: NextFunction) => {
                await this.waitingRoomService.deleteWaitingRoom(req.params.name, req.params.username, req.params.type)
                    .catch((error: Error) => console.error(error.message));
                res.send();
            });

        router.delete(
            "/waitingRoom/all/:username",
            async (req: Request, res: Response, next: NextFunction) => {
                if (req.params.username) {
                    this.waitingRoomService.deleteAllWaitingRooms(req.params.username);
                }
                res.send();
            });

        router.delete(
            "/sheet/:id/:type",
            async (req: Request, res: Response, next: NextFunction) => {
                try {
                    await this.db.deleteGameSheet(req.params.id, req.params.type);
                    this.sendGameSheetDeletionMessage(req.params.id, req.params.type);
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

    private sendGameSheetDeletionMessage(id: string, type: GameType): void {
        Socket.io.emit(`GameSheetDeleted-${id}-${type}`);
    }
}
