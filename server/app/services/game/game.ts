import { GameType, HasId } from "../../../../common/communication/game-description";

export abstract class AbstractGame implements HasId {

    public constructor(
        public id: string,
        public readonly type: GameType,
    ) { }

    protected abstract async setUp(name: string): Promise<{}>;

}
