import { Container } from "inversify";
import { Application } from "./app";
import { DifferenceCheckerController } from "./controllers/difference-checker.controller";
import { GameSheetGenerationController } from "./controllers/game-sheet-generation.controller";
import { GetGameListController } from "./controllers/get-game-list.controller";
import { GetGameController } from "./controllers/get-game.controller";
import { Server } from "./server";
import { DBConnectionService } from "./services/dbconnection.service";
import { DifferenceCheckerService } from "./services/difference-checker.service";
import { DifferenceImageGenerator } from "./services/difference-image-generator.service";
import { DifferencesFinderService } from "./services/differences-finder.service";
import { GameSheetGenerationService } from "./services/game-sheet-generation.service";
import { GetGameListService } from "./services/get-game-list.service";
import { GetGameService } from "./services/get-game.service";
import { UsernameValidatorService } from "./services/username-validator.service";
import { Socket } from "./socket";
import Types from "./types";

const container: Container = new Container();

container.bind(Types.Server).to(Server);
container.bind(Types.Socket).to(Socket);
container.bind(Types.Application).to(Application);
container.bind(Types.UsernameValidatorService).to(UsernameValidatorService);
container.bind(Types.GetGameListService).to(GetGameListService);
container.bind(Types.GetGameListController).to(GetGameListController);
container.bind(Types.DifferenceImageGenerator).to(DifferenceImageGenerator);
container.bind(Types.GameSheetGenerationController).to(GameSheetGenerationController);
container.bind(Types.DifferencesFinderService).to(DifferencesFinderService);
container.bind(Types.DBConnectionService).to(DBConnectionService);
container.bind(Types.GameSheetGenerationService).to(GameSheetGenerationService);
container.bind(Types.GetGameController).to(GetGameController);
container.bind(Types.GetGameService).to(GetGameService);
container.bind(Types.DifferenceCheckerController).to(DifferenceCheckerController);
container.bind(Types.DifferenceCheckerService).to(DifferenceCheckerService);
export { container };
