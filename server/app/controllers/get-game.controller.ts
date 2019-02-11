import { NextFunction, Request, Response, Router } from "express";
import { inject, injectable } from "inversify";
import { Message, MessageType } from "../../../common/communication/message";
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
                        const game: Game | undefined = this.getGameService.getGame(req.params.id);
                        const imageData: string = game ?
                                                    game.differenceImage.toArray().toString() :
                                                    "";

                        const message: Message = {
                            type: MessageType.GAME_SHEET_GENERATION,
                            body: imageData,
                        };

                        res.send(message);
                    });

        router.get( "/:id/originalImage",
                    (req: Request, res: Response, next: NextFunction) => {
                            const game: Game | undefined = this.getGameService.getGame(req.params.id);
                            const imageData: string = game ?
                                                        game.originalImage.toArray().toString() :
                                                        "";
                            const message: Message = {
                                type: MessageType.GAME_SHEET_GENERATION,
                                body: imageData,
                            };

                            res.send(message);
                    });

        router.get( "/:id/modifiedImage",
                    (req: Request, res: Response, next: NextFunction) => {
                            const game: Game | undefined = this.getGameService.getGame(req.params.id);
                            const imageData: string = game ?
                                                        game.modifiedImage.toArray().toString() :
                                                        "";
                            const message: Message = {
                                type: MessageType.GAME_SHEET_GENERATION,
                                body: imageData,
                            };

                            res.send(message);
                    });

        router.get( "/:id",
                    (req: Request, res: Response, next: NextFunction) => {
                            const images: string[] = this.getGameService.getGameImages(req.params.id);
                            const message: Message = {
                                type: MessageType.GAME_SHEET_GENERATION,
                                body: JSON.stringify(images),
                            };

                            res.send(message);
                    });

        return router;
    }
}
