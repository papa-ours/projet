import Axios, { AxiosResponse } from "axios";
import { NextFunction } from "connect";
import { Request, Response, Router } from "express";
import { inject, injectable } from "inversify";
import { SERVER_ADDRESS } from "../../../common/communication/constants";
import { GameMode, GameSheet } from "../../../common/communication/game-description";
import { Message } from "../../../common/communication/message";
import { ChatMessageService } from "../services/chat-message.service";
import { AbstractGame } from "../services/game/game";
import { GetGameService } from "../services/get-game.service";
import { ScoreUpdaterService } from "../services/score-updater.service";
import { Socket } from "../socket";
import Types from "../types";

@injectable()
export class EndGameController {

    private static readonly BASE_10: number = 10;

    public constructor(
        @inject(Types.ScoreUpdaterService) private scoreUpdaterService: ScoreUpdaterService,
        @inject(Types.GetGameService) private getGameService: GetGameService,
        @inject(Types.ChatMessageService) private chatMessageService: ChatMessageService,
    ) {

    }

    public get router(): Router {
        const router: Router = Router();

        router.post(
            "/",
            async (req: Request, res: Response, next: NextFunction) => {
                const game: AbstractGame = this.getGameService.getGame(req.body.gameId);
                await this.sendWinner(game);
                await this.scoreUpdaterService.putScore(
                        game.sheetId,
                        game.usernames[game.winner],
                        parseInt(req.body.time, EndGameController.BASE_10),
                        game.gameMode,
                    ).then((gameSheet: GameSheet) => {
                        const position: number = this.scoreUpdaterService.getPosition(gameSheet, req.body.time, game.gameMode);
                        if (position !== -1) {
                            this.chatMessageService.sendBestTimeMessage(game.usernames[game.winner], position, game.name, game.gameMode);
                        }
                    });

                this.getGameService.removeGame(req.body.gameId)
                .then(() => {
                    res.send({
                        body: "",
                    });
                }).catch((error: Error) => {
                    console.error(error);
                    next(error);
                });
            },
        );

        return router;
    }

    private sendWinner(game: AbstractGame): void {
        game.gameMode == GameMode.Solo ? this.sendWinnerSolo(game) : this.sendWinnerPvp(game);
    }

    private sendWinnerSolo(game: AbstractGame): void {
        Axios.get(`${SERVER_ADDRESS}/api/id/${game.usernames[game.winner]}/`)
        .then((response: AxiosResponse<Message>) => {
            const socketId: string = response.data.body;
            const socket: SocketIO.Socket | undefined = Socket.getSocket(socketId);
            if (socket) {
                socket.emit("endGameWinner", game.usernames[game.winner]);
            }
        });
    }

    private sendWinnerPvp(game: AbstractGame): void {
        Socket.io.to(`${game.sheetId}-${game.usernames[0]}`).emit("endGameWinner", game.usernames[game.winner]);
    }
}
