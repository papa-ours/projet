import Axios from "axios";
import { NextFunction, Request, Response, Router } from "express";
import { inject, injectable } from "inversify";
import { SERVER_ADDRESS } from "../../../common/communication/constants";
import { Message, MessageType } from "../../../common/communication/message";
import { VectorInterface } from "../../../common/communication/vector-interface";
import { DifferenceCheckerService } from "../services/difference-checker.service";
import { FreeGame } from "../services/game/free-game";
import { SimpleGame } from "../services/game/simple-game";
import { GetGameService } from "../services/get-game.service";
import { SceneDifferenceCheckerService } from "../services/scene/scene-difference-checker";
import Types from "../types";

@injectable()
export class DifferenceCheckerController {

    public constructor(
        @inject(Types.DifferenceCheckerService) private differenceChecker: DifferenceCheckerService,
        @inject(Types.GetGameService) private getGameService: GetGameService,
        @inject(Types.SceneDifferenceCheckerService) private sceneDifferenceCheckerService: SceneDifferenceCheckerService,
    ) {

    }

    public get router(): Router {
        const router: Router = Router();

        router.get(
            "/:id/:x/:y",
            async (req: Request, res: Response, next: NextFunction) => {
                const x: number = parseInt(req.params.x, 10);
                const y: number = parseInt(req.params.y, 10);
                const id: string = req.params.id;

                const message: Message = {
                    type: MessageType.GAME_SHEET_GENERATION,
                    body: "",
                };

                try {
                    const game: SimpleGame = this.getGameService.getGame(id) as SimpleGame;

                    let isDifference: boolean = false;
                    isDifference = this.differenceChecker.isPositionDifference(x, y, game);

                    if (isDifference) {
                        await game.restoreModifiedImage(x, y);
                        if (game.differenceCount === 0) {
                            Axios.post(`${SERVER_ADDRESS}/api/endgame/${game.sheetId}/${game.id}/${game.username}/${game.time}`);
                        }
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
                const game: FreeGame = this.getGameService.getGame(sceneName) as FreeGame;
                const position: VectorInterface = req.body.position;
                const isModification: boolean = this.sceneDifferenceCheckerService.checkDifference(game.scene, position);
                if (isModification) {
                    game.restoreModifiedScene(position);
                    if (game.differenceCount === 0) {
                        Axios.post(`${SERVER_ADDRESS}/api/endgame/${game.sheetId}/${game.id}/${game.username}/${game.time}`);
                    }
                }
                message.body = String(isModification);
                res.send(message);
            });

        router.post(
                "/3D/differences",
                async (req: Request, res: Response, next: NextFunction) => {
                    const message: Message = {
                        type: MessageType.SCENE_DATA,
                        body: "error",
                    };
                    try {
                        const sceneName: string = req.body.name as string;
                        const game: FreeGame = this.getGameService.getGame(sceneName) as FreeGame;
                        message.body = JSON.stringify(this.sceneDifferenceCheckerService.getDifferences(game.scene));
                    } catch (err) {
                        message.body = err.message;
                    }
                    res.send(message);
                });

        return router;
    }
}
