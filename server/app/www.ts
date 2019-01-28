import "reflect-metadata";
import { container } from "./inversify.config";
import { Server } from "./server";
import { Socket } from "./socket";
import Types from "./types";

const server: Server = container.get<Server>(Types.Server);

server.init();

const socket: Socket = container.get<Socket>(Types.Socket);
socket.init(server.getServer());
