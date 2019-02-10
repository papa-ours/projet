import { NextFunction, Request, Response, Router } from "express";
import { inject, injectable } from "inversify";
import { Message, MessageType } from "../../../common/communication/message";
import { DifferenceCheckerService } from "../services/difference-checker.service";
import Types from "../types";

@injectable()
export class DifferenceCheckerController {

    public constructor( @inject(Types.DifferenceCheckerService) private differenceChecker: DifferenceCheckerService,
                        ) {}

    public get router(): Router {
        const router: Router = Router();

        router.get("/:id/:x/:y", (req: Request, res: Response, next: NextFunction) => {
            const x: number = parseInt(req.params.x, 10);
            const y: number = parseInt(req.params.y, 10);
            const id: string = req.params.id;

            const message: Message = {
                type: MessageType.GAME_SHEET_GENERATION,
                body: this.differenceChecker.isPositionDifference(x, y, id).toString(),
            };

            res.send(message);
        });

        return router;
    }
}
