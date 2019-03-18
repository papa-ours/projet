import { NextFunction, Request, Response, Router } from "express";
import { inject, injectable } from "inversify";
import { Message, MessageType } from "../../../common/communication/message";
import { VectorInterface } from "../../../common/communication/vector-interface";
import { DifferenceCheckerService } from "../services/difference-checker.service";
import { Game } from "../services/game";
import { GetGameService } from "../services/get-game.service";
import { SceneDifferenceCheckerService } from "../services/scene/scene-difference-checker";
import Types from "../types";

@injectable()
export class DifferenceCheckerController {

    public constructor(@inject(Types.DifferenceCheckerService) private differenceChecker: DifferenceCheckerService) {

    }

    public get router(): Router {
        const router: Router = Router();

        router.get(
            "/:id/:x/:y",
            async (req: Request, res: Response, next: NextFunction) => {
                const getGameService: GetGameService = new GetGameService();
                const x: number = parseInt(req.params.x, 10);
                const y: number = parseInt(req.params.y, 10);
                const id: string = req.params.id;

                const message: Message = {
                    type: MessageType.GAME_SHEET_GENERATION,
                    body: "",
                };

                try {
                    const game: Game = getGameService.getGame(id);

                    let isDifference: boolean = false;
                    isDifference = this.differenceChecker.isPositionDifference(x, y, game);

                    if (isDifference) {
                        await game.restoreModifiedImage(x, y);
                    }

                    message.body = isDifference.toString();
                } catch (err) {
                    message.body = err.message;
                }

                res.send(message);
            });

        router.post(
            "/3D",
            async (req: Request, res: Response, next: NextFunction) => {
                const message: Message = {
                    type: MessageType.SCENE_DATA,
                    body: "false",
                };
                const sceneName: string = req.body.name as string;
                const getGameService: GetGameService = new GetGameService();
                const game: Game = getGameService.getGame(sceneName);
                const position: VectorInterface = req.body.position;
                const differenceChecker: SceneDifferenceCheckerService = new SceneDifferenceCheckerService(game.scene);
                const isModification: boolean = differenceChecker.checkDifference(position);
                if (isModification) {
                    game.restoreModifiedScene(position);
                }
                message.body = String(isModification);
                res.send(message);
            });

        router.post(
                "/all/differences",
                async (req: Request, res: Response, next: NextFunction) => {
                    const message: Message = {
                        type: MessageType.SCENE_DATA,
                        body: "error",
                    };
                    const sceneName: string = req.body.name as string;
                    const getGameService: GetGameService = new GetGameService();
                    const game: Game = getGameService.getGame(sceneName);
                    const differenceChecker: SceneDifferenceCheckerService = new SceneDifferenceCheckerService(game.scene);
                    message.body = differenceChecker.differenceSet.toString();
                    res.send(message);
                });

        return router;
    }
}
