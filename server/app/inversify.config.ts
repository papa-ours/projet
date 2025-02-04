import { Container } from "inversify";
import { Application } from "./app";
import { CreateGameController } from "./controllers/create-game-constroller";
import { DifferenceCheckerController } from "./controllers/difference-checker.controller";
import { DifferenceImageController } from "./controllers/difference-image.controller";
import { EndGameController } from "./controllers/end-game.controller";
import { GameSheetGenerationController } from "./controllers/game-sheet-generation.controller";
import { GetGameListController } from "./controllers/get-game-list.controller";
import { SceneDataController } from "./controllers/scene-data.controller";
import { UsernameController } from "./controllers/username.controller";
import { Server } from "./server";
import { ChatMessageService } from "./services/chat-message.service";
import { DBConnectionService } from "./services/db-connection.service";
import { DifferenceCheckerService } from "./services/difference-checker.service";
import { DifferenceImageGenerator } from "./services/difference-image-generator.service";
import { DifferencesFinderService } from "./services/differences-finder.service";
import { GameSheetGenerationService } from "./services/game-sheet-generation.service";
import { GetGameListService } from "./services/get-game-list.service";
import { GetGameService } from "./services/get-game.service";
import { SceneDataGeneratorService } from "./services/scene/scene-data-generator";
import { SceneDifferenceCheckerService } from "./services/scene/scene-difference-checker";
import { SceneDataDifferenceService } from "./services/scene/scene-difference-generator";
import { ScoreUpdaterService } from "./services/score-updater.service";
import { SendWinnerService } from "./services/send-winner.service";
import { UsernameValidatorService } from "./services/username-validator.service";
import { UsersContainerService } from "./services/users-container.service";
import { WaitingRoomService } from "./services/waiting-room.service";
import { Socket } from "./socket";
import Types from "./types";

const container: Container = new Container();

container.bind(Types.Server).to(Server);
container.bind(Types.Socket).to(Socket);
container.bind(Types.Application).to(Application);
container.bind(Types.UsernameValidatorService).to(UsernameValidatorService);
container.bind(Types.UsernameController).to(UsernameController);
container.bind(Types.GetGameListService).to(GetGameListService);
container.bind(Types.GetGameListController).to(GetGameListController);
container.bind(Types.DifferenceImageGenerator).to(DifferenceImageGenerator);
container.bind(Types.DifferenceImageController).to(DifferenceImageController);
container.bind(Types.GameSheetGenerationController).to(GameSheetGenerationController);
container.bind(Types.DifferencesFinderService).to(DifferencesFinderService);
container.bind(Types.GameSheetGenerationService).to(GameSheetGenerationService);
container.bind(Types.CreateGameController).to(CreateGameController);
container.bind(Types.GetGameService).to(GetGameService);
container.bind(Types.SceneDataGeneratorService).to(SceneDataGeneratorService);
container.bind(Types.SceneDataController).to(SceneDataController);
container.bind(Types.SceneDataDifferenceService).to(SceneDataDifferenceService);
container.bind(Types.DifferenceCheckerController).to(DifferenceCheckerController);
container.bind(Types.DifferenceCheckerService).to(DifferenceCheckerService);
container.bind(Types.UsersContainerService).to(UsersContainerService);
container.bind(Types.ChatMessageService).to(ChatMessageService);
container.bind(Types.DBConnectionService).to(DBConnectionService);
container.bind(Types.ScoreUpdaterService).to(ScoreUpdaterService);
container.bind(Types.EndGameController).to(EndGameController);
container.bind(Types.SceneDifferenceCheckerService).to(SceneDifferenceCheckerService);
container.bind(Types.WaitingRoomService).to(WaitingRoomService);
container.bind(Types.SendWinnerService).to(SendWinnerService);
export { container };
