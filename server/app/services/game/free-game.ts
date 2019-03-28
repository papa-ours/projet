import { AWSError, S3 } from "aws-sdk";
import { PromiseResult } from "aws-sdk/lib/request";
import { GameMode, GameType } from "../../../../common/communication/game-description";
import { SceneData } from "../../../../common/communication/geometry";
import { VectorInterface } from "../../../../common/communication/vector-interface";
import { SceneDifferenceRestorationService } from "../scene/scene-difference-restoration";
import { AWSFilesUtil } from "../utils/aws-files.util";
import { FileIO } from "../utils/file-io.util";
import { AbstractGame } from "./game";

export class FreeGame extends AbstractGame {

    public scene: SceneData;

    private constructor(id: string, name: string, sheetId: string, mode: GameMode) {
        super(id, sheetId, name, mode, GameType.Free);
    }

    public static async create(id: string, sheetId: string, mode: GameMode, name: string): Promise<FreeGame> {
        const game: FreeGame = new FreeGame(id, name, sheetId, mode);

        return game.setUp(name).then(() => game);
    }

    protected async setUp(name: string): Promise<{}> {
        return AWSFilesUtil.readFile(`${name}-data.json`).then((result: PromiseResult<S3.GetObjectOutput, AWSError>) =>
            this.scene = JSON.parse((result.Body as Buffer).toString()),
        );
    }

    public async cleanUp(): Promise<{}> {
        return FileIO.deleteFile(`uploads/${this.id}-data.txt`);
    }

    public restoreModifiedScene(position: VectorInterface): void {
        const differenceRestoration: SceneDifferenceRestorationService = new SceneDifferenceRestorationService(this.scene);
        this.scene = differenceRestoration.getSceneAfterDifferenceUpdate(position);
        this.saveModifiedScene();
        this.differenceCount--;
    }

    private saveModifiedScene(): void {
        FileIO.writeFile(`uploads/${this.id}-data.txt`, Buffer.from(JSON.stringify(this.scene)))
            .catch((err: Error) => console.error(err));
    }
}
