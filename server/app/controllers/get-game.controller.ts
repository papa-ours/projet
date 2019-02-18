import { NextFunction, Request, Response, Router } from "express";
import { inject, injectable } from "inversify";
import { Message, MessageType } from "../../../common/communication/message";
import { ImageType } from "../../../common/images/image-type";
import { Game } from "../services/game";
import { GetGameService } from "../services/get-game.service";
import Types from "../types";

@injectable()
export class GetGameController {

    public constructor(@inject(Types.GetGameService) private getGameService: GetGameService) { }

    public get router(): Router {
        const router: Router = Router();

        router.get( "/:id/differenceImage",
                    (req: Request, res: Response, next: NextFunction) => {
                        const message: Message = {
                            type: MessageType.GAME_SHEET_GENERATION,
                            body: "",
                        };

                        try {
                            const game: Game = this.getGameService.getGame(req.params.id);
                            const imageData: string = game.differenceImage.toArray().toString();
                            message.body = imageData;
                        } catch (err) {
                            message.body = err.message;
                        }

                        res.send(message);
                    });

        router.get( "/:id/originalImage",
                    (req: Request, res: Response, next: NextFunction) => {
                        const message: Message = {
                            type: MessageType.GAME_SHEET_GENERATION,
                            body: "",
                        };

                        try {
                            const game: Game = this.getGameService.getGame(req.params.id);
                            const imageData: string = game.images[ImageType.Original].toArray().toString();
                            message.body = imageData;
                        } catch (err) {
                            message.body = err.message;
                        }

                        res.send(message);
                    });

        router.get( "/:id/modifiedImage",
                    (req: Request, res: Response, next: NextFunction) => {
                        const message: Message = {
                            type: MessageType.GAME_SHEET_GENERATION,
                            body: "",
                        };

                        try {
                            const game: Game = this.getGameService.getGame(req.params.id);
                            const imageData: string = game.images[ImageType.Modified].toArray().toString();
                            message.body = imageData;
                        } catch (err) {
                            message.body = err.message;
                        }

                        res.send(message);
                    });

        router.get( "/:name",
                    (req: Request, res: Response, next: NextFunction) => {
                        const id: string = this.getGameService.createGame(req.params.name);
                        const message: Message = {
                            type: MessageType.GAME_SHEET_GENERATION,
                            body: JSON.stringify(id),
                        };

                        res.send(message);
                    });

        return router;
    }
}
