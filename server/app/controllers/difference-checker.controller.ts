import { Router } from "express";
import { injectable } from "inversify";

@injectable()
export class DifferenceCheckerController {

    public get router(): Router {
        return Router();
    }
}
