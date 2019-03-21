import { GameType } from "../../../../common/communication/game-description";
import { SceneData } from "../../../../common/communication/geometry";
import { VectorInterface } from "../../../../common/communication/vector-interface";
import { SceneDifferenceRestorationService } from "../scene/scene-difference-restoration";
import { FileIO } from "../utils/file-io.util";
import { AbstractGame } from "./game";

export class FreeGame extends AbstractGame {

    public scene: SceneData;

    public constructor(id: string, name: string) {
        super(id, name, GameType.Free);
    }

    protected async setUp(name: string): Promise<{}> {
        return FileIO.readFile(`uploads/${name}-data.txt`).then((data: Buffer) =>
            this.scene = JSON.parse(data.toString()),
        );
    }

    public restoreModifiedScene(position: VectorInterface): void {
        const differenceRestoration: SceneDifferenceRestorationService = new SceneDifferenceRestorationService(this.scene);
        this.scene = differenceRestoration.getSceneAfterDifferenceUpdate(position);
        this.saveModifiedScene();
    }

    private saveModifiedScene(): void {
        FileIO.writeFile(`uploads/${this.id}-data.txt`, Buffer.from(JSON.stringify(this.scene)))
            .catch((err: Error) => console.error(err));
    }
}
