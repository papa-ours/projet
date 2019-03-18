import Axios from "axios";
import { NextFunction, Request, Response, Router } from "express";
import { inject, injectable } from "inversify";
import * as multer from "multer";
import { SERVER_ADDRESS } from "../../../common/communication/constants";
import { GeometryData, Modification, ModificationType, SceneData } from "../../../common/communication/geometry";
import { SceneDataGeneratorService } from "../services/scene/scene-data-generator";
import { SceneDataDifferenceService } from "../services/scene/scene-difference-generator";
import { FileIO } from "../services/utils/file-io.util";
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
            "/",
            uploads.fields([
                {name: "name", maxCount: 1},
                {name: "nbObjects", maxCount: 1},
                {name: "isAdding", maxCount: 1},
                {name: "isRemoval", maxCount: 1},
                {name: "isColorChange", maxCount: 1},
                {name: "objectType", maxCount: 1},
            ]),
            (req: Request, res: Response, next: NextFunction) => {
                const scene: SceneData = this.getSceneData(req);
                FileIO.writeFile(`uploads/${scene.name}-data.txt`, Buffer.from(JSON.stringify(scene)))
                    .catch((err: Error) => console.error(err));
                const SERVER_URL: string = `${SERVER_ADDRESS}/api/gamesheet/free/`;
                Axios.post(SERVER_URL, { name: scene.name });
        });

        return router;
    }

    private getSceneData(req: Request): SceneData {

        const modifications: Modification[] = this.getModifications(req);
        const originalGeometry: GeometryData[] = this.sceneDataGeneratorService.getSceneData(Number(req.body.nbObjects));

        const modifiedGeometry: GeometryData[] = this.sceneDataDifferenceService.getDifference(originalGeometry, modifications);

        return { name: req.body.name, originalScene: originalGeometry, modifiedScene: modifiedGeometry };
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
