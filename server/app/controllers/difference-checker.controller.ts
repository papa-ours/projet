import { Router } from "express";
import { injectable } from "inversify";

@injectable()
export class GetGameController {

    public get router(): Router {
        return Router();
    }
}
