import { REQUIRED_DIFFERENCES_1P } from "../../../../common/communication/constants";
import { GameType, HasId } from "../../../../common/communication/game-description";

export abstract class AbstractGame implements HasId {

    public differenceCount: number;

    public constructor(
        public id: string,
        public readonly type: GameType,
    ) {
        this.differenceCount = REQUIRED_DIFFERENCES_1P;
    }

    protected abstract async setUp(name: string): Promise<{}>;

}
