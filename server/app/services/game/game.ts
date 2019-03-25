import { REQUIRED_DIFFERENCES_1P } from "../../../../common/communication/constants";
import { GameType, HasId } from "../../../../common/communication/game-description";

export abstract class AbstractGame implements HasId {

    public differenceCount: number;
    private startTime: Date;
    public username: string;

    public constructor(
        public id: string,
        public sheetId: string,
        public readonly type: GameType,
    ) {
        this.differenceCount = REQUIRED_DIFFERENCES_1P;
    }

    protected abstract async setUp(name: string): Promise<{}>;
    public abstract async cleanUp(): Promise<{}>;

    public start(username: string): void {
        this.username = username;
        this.startTime = new Date();
    }

    public get time(): number {
        return new Date().getUTCSeconds() - this.startTime.getUTCSeconds();
    }
}
