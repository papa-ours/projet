import { NextFunction, Request, Response, Router } from "express";
import { inject, injectable } from "inversify";
import { GeometryData } from "../../../common/communication/geometryMessage";
import { Message, MessageType } from "../../../common/communication/message";
import { SceneDataGeneratorService } from "../services/scene/scene-data-generator";
import Types from "../types";

@injectable()
export class SceneDataControler {

    public constructor(@inject(Types.SceneDataGeneratorService) private sceneDataGeneratorService: SceneDataGeneratorService) { }

    public get router(): Router {
        const router: Router = Router();

        router.post("/",
                    (req: Request, res: Response, next: NextFunction) => {
                       // Send the request to the service and send the response
                        const scene: GeometryData [] = this.sceneDataGeneratorService.getSceneData(Number(req.body.body));
                        const message: Message = {
                            type: MessageType.SCENE_DATA,
                            body: JSON.stringify(scene),
                       };
                        res.send(message);
                   });

        return router;
    }
}
