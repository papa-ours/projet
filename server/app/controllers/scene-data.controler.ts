import { NextFunction, Request, Response, Router } from "express";
import { inject, injectable } from "inversify";
import { GeometryData, Modification, ModificationType, SceneData } from "../../../common/communication/geometryMessage";
import { SceneDataGeneratorService } from "../services/scene/scene-data-generator";
import { SceneDataDifferenceService } from "../services/scene/scene-difference-generator";
import Types from "../types";

@injectable()
export class SceneDataControler {

    public constructor(@inject(Types.SceneDataDifferenceService) private sceneDataDifferenceService: SceneDataDifferenceService,
                       @inject(Types.SceneDataGeneratorService) private sceneDataGeneratorService: SceneDataGeneratorService) { }

    public get router(): Router {
        const router: Router = Router();

        router.post("/",
                    (req: Request, res: Response, next: NextFunction) => {
                       // Send the request to the service and send the response
                      let modifications: Modification[] =
                       [{type: ModificationType.ADD, isActive: JSON.parse(req.body.adding)},
                        {type: ModificationType.DELETE, isActive: JSON.parse(req.body.removal)},
                        {type: ModificationType.CHANGE_COLOR, isActive: JSON.parse(req.body.colorChange)},
                       ];
                      modifications = modifications.filter( (modification: Modification) => modification.isActive);
                      const originalGeometry: GeometryData [] = this.sceneDataGeneratorService.getSceneData(Number(req.body.nbObjects));
                      const modifiedGeometry: GeometryData [] = this.sceneDataDifferenceService.
                                                                getDifference(originalGeometry, modifications);

                      const scene: SceneData = {name: req.body.name, originalScene: originalGeometry, modifiedScene: modifiedGeometry};
                      // TODO : sauvegarder la scene
                      console.log(scene);
                   });

        return router;
    }
}
