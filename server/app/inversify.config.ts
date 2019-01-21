import { Container } from "inversify";
import { Application } from "./app";
import { Routes } from "./routes";
import { GetGameList } from "./routes/get-game-list";
import { UsernameValidator } from "./routes/username-validator";
import { Server } from "./server";
import Types from "./types";

const container: Container = new Container();

container.bind(Types.Server).to(Server);
container.bind(Types.Application).to(Application);
container.bind(Types.Routes).to(Routes);

container.bind(Types.UsernameValidator).to(UsernameValidator);
container.bind(Types.GetGameList).to(GetGameList);

export { container };
