import "reflect-metadata";
import { container } from "./inversify.config";
import { Server } from "./server";
import Types from "./types";
import { Socket } from "./socket";

const server: Server = container.get<Server>(Types.Server);

server.init();
const socket: Socket = new Socket(server.getServer());
