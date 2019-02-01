import { injectable } from "inversify";
import "reflect-metadata";

@injectable()
export class DifferencesFinderService {

    public getNumberOfDifferences(imageData: number[]): number {
        let differencesCount: number = 0;
        this.findDifferences(imageData, differencesCount);

        return differencesCount;
    }

    private findDifferences(data: number[], count: number): void {
        
    }
}
