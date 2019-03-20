import { FileIO } from "../utils/file-io.util";
import { AbstractGame } from "./game";

export class FreeGame extends AbstractGame {

    protected setUp(name: string): void {
        FileIO.readFile(`uploads/${name}-data.txt`).then((data: Buffer) =>
            this.scene = JSON.parse(data.toString()),
        );
    }
}
