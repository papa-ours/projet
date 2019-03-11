import Axios from "axios";
import { NextFunction, Request, Response, Router } from "express";
import { inject, injectable } from "inversify";
import { SERVER_ADDRESS } from "../../../common/communication/constants";
import { SceneData } from "../../../common/communication/geometry";
import { Message, MessageType } from "../../../common/communication/message";
import { VectorInterface } from "../../../common/communication/vector-interface";
import { DifferenceCheckerService } from "../services/difference-checker.service";
import { Game } from "../services/game";
import { GetGameService } from "../services/get-game.service";
import { SceneDifferenceCheckerService } from "../services/scene/scene-difference-checker";
import { SceneDifferenceRestorationService } from "../services/scene/scene-difference-restoration";
import { FileWriterUtil } from "../services/utils/file-writer.util";
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
                const sceneName: string = String(req.body.name);
                this.getSceneData(sceneName).then(
                    //TODO: trouver un typedef
                    (promise) => {
                        let sceneData: SceneData = promise.data;
                        const position: VectorInterface = req.body.position;
                        const differenceChecker: SceneDifferenceCheckerService = new SceneDifferenceCheckerService(sceneData);
                        const isModification: boolean = differenceChecker.checkDifference(position);
                        if (isModification) {
                            const differenceRestoration: SceneDifferenceRestorationService =
                                                         new SceneDifferenceRestorationService(sceneData);

                            sceneData = differenceRestoration.getSceneAfterDifferenceUpdate(position);
                            FileWriterUtil.writeFile(`uploads/${sceneName}-data.txt`, Buffer.from(JSON.stringify(sceneData)))
                                .catch((err: Error) => console.error(err));
                        }
                        message.body = String(isModification);
                        res.send(message);
                    }).catch(console.error);
            });

        return router;
    }
    //TODO: remplacer le any
    private getSceneData(name: string): Promise<any> {
        return Axios.get(`${SERVER_ADDRESS}/${name}-data.txt`);
    }
}
