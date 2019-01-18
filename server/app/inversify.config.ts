import { Container } from "inversify";
import Types from "./types";
import { Server } from "./server";
import { Application } from "./app";
import { UsernameValidator } from "./routes/username-validator";
import { Routes } from "./routes";
import { GetGameList } from "./routes/get-game-list";

const container: Container = new Container();

container.bind(Types.Server).to(Server);
container.bind(Types.Application).to(Application);
container.bind(Types.Routes).to(Routes);

container.bind(Types.UsernameValidator).to(UsernameValidator);
container.bind(Types.GetGameList).to(GetGameList);

export { container };
