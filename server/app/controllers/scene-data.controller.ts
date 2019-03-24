import Axios from "axios";
import { NextFunction, Request, Response, Router } from "express";
import { inject, injectable } from "inversify";
import * as multer from "multer";
import { SERVER_ADDRESS } from "../../../common/communication/constants";
import { GeometryData, GeometryType, Modification, ModificationType, SceneData, SceneType } from "../../../common/communication/geometry";
import { MessageType } from "../../../common/communication/message";
import { SceneDataGeneratorService } from "../services/scene/scene-data-generator";
import { SceneDataDifferenceService } from "../services/scene/scene-difference-generator";
import { AWSFilesUtil } from "../services/utils/aws-files.util";
import Types from "../types";

@injectable()
export class SceneDataController {

    public constructor(
        @inject(Types.SceneDataDifferenceService) private sceneDataDifferenceService: SceneDataDifferenceService,
        @inject(Types.SceneDataGeneratorService) private sceneDataGeneratorService: SceneDataGeneratorService,
    ) { }

    public get router(): Router {
        const router: Router = Router();
        const uploads: multer.Instance = multer();

        router.post(
            "/geometric",
            uploads.fields([
                {name: "name", maxCount: 1},
                {name: "nbObjects", maxCount: 1},
                {name: "isAdding", maxCount: 1},
                {name: "isRemoval", maxCount: 1},
                {name: "isColorChange", maxCount: 1},
            ]),
            async (req: Request, res: Response, next: NextFunction) => {
                const scene: SceneData = this.getSceneData(req, SceneType.GEOMETRIC);
                await AWSFilesUtil.writeFile(`${scene.name}-data.json`, Buffer.from(JSON.stringify(scene)))
                    .catch((err: Error) => console.error(err));
                const SERVER_URL: string = `${SERVER_ADDRESS}/api/gamesheet/free/`;
                await Axios.post(SERVER_URL, { name: scene.name });
                res.send({
                    type: MessageType.GAME_FREE_VIEW_GENERATION,
                    body: "",
                });
        });

        router.post(
            "/thematic",
            uploads.fields([
                {name: "name", maxCount: 1},
                {name: "nbObjects", maxCount: 1},
                {name: "isAdding", maxCount: 1},
                {name: "isRemoval", maxCount: 1},
                {name: "isColorChange", maxCount: 1},
                {name: "sizes", maxCount: 8},
            ]),
            async (req: Request, res: Response, next: NextFunction) => {
                const sizes: number[] = JSON.parse(req.body.sizes);
                const scene: SceneData = this.getSceneData(req, SceneType.THEMATIC, sizes, GeometryType.CUBE);
                await AWSFilesUtil.writeFile(`${scene.name}-data.json`, Buffer.from(JSON.stringify(scene)))
                    .catch((err: Error) => console.error(err));
                const SERVER_URL: string = `${SERVER_ADDRESS}/api/gamesheet/free/`;
                await Axios.post(SERVER_URL, { name: scene.name });
                res.send({
                    type: MessageType.GAME_FREE_VIEW_GENERATION,
                    body: "",
                });
        });

        return router;
    }

    private getSceneData(req: Request, sceneType: SceneType, sizes?: number[], type?: GeometryType): SceneData {

        const modifications: Modification[] = this.getModifications(req);
        const originalGeometry: GeometryData[] = this.sceneDataGeneratorService.getSceneData(Number(req.body.nbObjects), sizes, type);

        const modifiedGeometry: GeometryData[] = 
            this.sceneDataDifferenceService.getDifference(originalGeometry, modifications, sizes, type);

        return { name: req.body.name, originalScene: originalGeometry, modifiedScene: modifiedGeometry, type: sceneType };
    }

    private getModifications(req: Request): Modification[] {

        const modifications: Modification[] = [
            { type: ModificationType.ADD, isActive: JSON.parse(req.body.isAdding) },
            { type: ModificationType.DELETE, isActive: JSON.parse(req.body.isRemoval) },
            { type: ModificationType.CHANGE_COLOR, isActive: JSON.parse(req.body.isColorChange) },
        ];

        return modifications.filter((modification: Modification) => modification.isActive);
    }
}
