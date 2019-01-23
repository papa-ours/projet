import { injectable } from "inversify";
import { Message } from "../../../common/communication/message";

import { Request, Response } from "express";
import "reflect-metadata";

@injectable()
export class DifferenceImageGenerator {
    public generate(req: Request, res: Response): void;
}
