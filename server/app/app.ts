import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import * as cors from "cors";
import * as express from "express";
import { inject, injectable } from "inversify";
import * as logger from "morgan";
import { DifferenceCheckerController } from "./controllers/difference-checker.controller";
import { DifferenceImageController } from "./controllers/difference-image.controller";
import { GameSheetGenerationController } from "./controllers/game-sheet-generation.controller";
import { GetGameListController } from "./controllers/get-game-list.controller";
import { GetGameController } from "./controllers/get-game.controller";
import { SceneDataController } from "./controllers/scene-data.controller";
import { UsernameValidatorController } from "./controllers/username-validator.controller";
import Types from "./types";

@injectable()
export class Application {

    private readonly internalError: number = 500;
    public app: express.Application;

    public constructor(
            @inject(Types.GetGameListController) private getGameListController: GetGameListController,
            @inject(Types.GetGameController) private getGameController: GetGameController,
            @inject(Types.GameSheetGenerationController) private gameSheetGenerationController: GameSheetGenerationController,
            @inject(Types.SceneDataController) private sceneDataController: SceneDataController,
            @inject(Types.DifferenceImageController) private differenceImageController: DifferenceImageController,
            @inject(Types.DifferenceCheckerController) private differenceCheckerController: DifferenceCheckerController,
            @inject(Types.UsernameValidatorController) private usernameValidatorController: UsernameValidatorController) {
        this.app = express();

        this.config();

        this.bindRoutes();
    }

    private config(): void {
        // Middlewares configuration
        this.app.use(logger("dev"));
        this.app.use(bodyParser.json({ limit: "50mb"}));
        this.app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
        this.app.use(cookieParser());
        this.app.use(cors());
        this.app.use(express.static("uploads"));
    }

    public bindRoutes(): void {
        // Notre application utilise le routeur de notre API `Index`
        this.app.use("/api/gamesheet", this.gameSheetGenerationController.router);
        this.app.use("/api/difference", this.differenceCheckerController.router);
        this.app.use("/api/gamelist", this.getGameListController.router);
        this.app.use("/api/difference_image", this.differenceImageController.router);
        this.app.use("/api/game", this.getGameController.router);
        this.app.use("/api/scene", this.sceneDataController.router);
        this.app.use("/api/user", this.usernameValidatorController.router);
        this.errorHandeling();
    }

    private errorHandeling(): void {
        // Gestion des erreurs
        this.app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
            const err: Error = new Error("Not Found");
            next(err);
        });

        // development error handler
        // will print stacktrace
        if (this.app.get("env") === "development") {
            // tslint:disable-next-line:no-any
            this.app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
                res.status(err.status || this.internalError);
                res.send({
                    message: err.message,
                    error: err,
                });
            });
        }

        // production error handler
        // no stacktraces leaked to user (in production env only)
        // tslint:disable-next-line:no-any
        this.app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
            res.status(err.status || this.internalError);
            res.send({
                message: err.message,
                error: {},
            });
        });
    }
}
