import { injectable } from "inversify";
import "reflect-metadata";

@injectable()
export class DifferenceCheckerService {
    public isPositionDifference(x: number, y: number, id: string): boolean {
        return false;
    }
}
