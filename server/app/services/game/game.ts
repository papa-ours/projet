import { REQUIRED_DIFFERENCES_1P } from "../../../../common/communication/constants";
import { GameMode, GameType, HasId } from "../../../../common/communication/game-description";
import { Chrono } from "../utils/chrono";

export abstract class AbstractGame implements HasId {

    public differenceCount: number;
    private chrono: Chrono;
    public username: string;

    public constructor(
        public id: string,
        public sheetId: string,
        public name: string,
        public gameMode: GameMode,
        public readonly type: GameType,
    ) {
        this.differenceCount = REQUIRED_DIFFERENCES_1P;
        this.chrono = new Chrono();
    }

    protected abstract async setUp(name: string): Promise<{}>;
    public abstract async cleanUp(): Promise<{}>;

    public start(username: string): void {
        this.username = username;
        this.chrono.start();
    }

    public get time(): number {
        return this.chrono.time;
    }
}
