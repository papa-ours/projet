import Axios from "axios";
import { NextFunction, Request, Response, Router } from "express";
import { inject, injectable } from "inversify";
import { LOCAL_HOST_PORT } from "../../../common/communication/constants";
import { GeometryData, Modification, ModificationType, SceneData } from "../../../common/communication/geometry";
import { SceneDataGeneratorService } from "../services/scene/scene-data-generator";
import { SceneDataDifferenceService } from "../services/scene/scene-difference-generator";
import { FileWriterUtil } from "../services/utils/file-writer.util";
import Types from "../types";

@injectable()
export class SceneDataController {

    public constructor(@inject(Types.SceneDataDifferenceService) private sceneDataDifferenceService: SceneDataDifferenceService,
                       @inject(Types.SceneDataGeneratorService) private sceneDataGeneratorService: SceneDataGeneratorService) { }

    public get router(): Router {
        const router: Router = Router();

        router.post("/", (req: Request, res: Response, next: NextFunction) => {
                let modifications: Modification[] =
                    [
                        { type: ModificationType.ADD, isActive: JSON.parse(req.body.isAdding) },
                        { type: ModificationType.DELETE, isActive: JSON.parse(req.body.isRemoval) },
                        { type: ModificationType.CHANGE_COLOR, isActive: JSON.parse(req.body.isColorChange) },
                    ];

                modifications = modifications.filter((modification: Modification) => modification.isActive);

                const originalGeometry: GeometryData[] =
                    this.sceneDataGeneratorService.getSceneData(Number(req.body.nbObjects));

                const modifiedGeometry: GeometryData[] =
                    this.sceneDataDifferenceService.getDifference(originalGeometry, modifications);

                const scene: SceneData = { name: req.body.name, originalScene: originalGeometry, modifiedScene: modifiedGeometry };

                FileWriterUtil.writeFile(`uploads/${scene.name}-data.txt`, Buffer.from(JSON.stringify(scene)));
                const SERVER_URL: string = `${LOCAL_HOST_PORT}/api/gamesheet/free/`;
                Axios.post(SERVER_URL, {name: scene.name});
            });

        return router;
    }
}
