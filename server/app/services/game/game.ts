import { GameType, HasId } from "../../../../common/communication/game-description";

export abstract class AbstractGame implements HasId {

    public constructor(public id: string, name: string, public readonly type: GameType) {
        this.setUp(name);
    }

    protected abstract setUp(name: string): void;

}
