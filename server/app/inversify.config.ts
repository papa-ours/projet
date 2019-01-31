import { Container } from "inversify";
import { Application } from "./app";
import { GetGameListController } from "./controllers/get-game-list.controller";
import { ImageDifferenceController } from "./controllers/image-difference.controller";
import { Server } from "./server";
import { DBConnectionService } from "./services/dbconnection.service";
import { DifferenceImageGenerator } from "./services/difference-image-generator.service";
import { DifferencesFinderService } from "./services/differences-finder.service";
import { GetGameListService } from "./services/get-game-list.service";
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
container.bind(Types.ImageDifferenceController).to(ImageDifferenceController);
container.bind(Types.DifferencesFinderService).to(DifferencesFinderService);
container.bind(Types.DBConnectionService).to(DBConnectionService);

export { container };
