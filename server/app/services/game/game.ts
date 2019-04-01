import { REQUIRED_DIFFERENCES_1P, REQUIRED_DIFFERENCES_2P } from "../../../../common/communication/constants";
import { GameMode, GameType, HasId } from "../../../../common/communication/game-description";
import { Chrono } from "../utils/chrono";

export abstract class AbstractGame implements HasId {

    public differenceCounts: number[];
    private chrono: Chrono;
    public usernames: string[];
    public winner: number;

    public constructor(
        public id: string,
        public sheetId: string,
        public name: string,
        public gameMode: GameMode,
        public readonly type: GameType,
    ) {
        this.winner = 0;
        this.chrono = new Chrono();
    }

    protected abstract async setUp(name: string): Promise<{}>;
    public abstract async cleanUp(): Promise<{}>;

    public start(usernames: string[]): void {
        this.usernames = usernames;

        this.differenceCounts = usernames.length === 1 ? [REQUIRED_DIFFERENCES_1P] : [REQUIRED_DIFFERENCES_2P, REQUIRED_DIFFERENCES_2P];

        this.chrono.start();
    }

    public get time(): number {
        return this.chrono.time;
    }
}
