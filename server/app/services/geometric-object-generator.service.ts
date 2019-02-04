import { injectable } from "inversify";
import * as THREE from "three";

@injectable()
export class GeometricObjectGenerator {

    private readonly COLOR_MAX_NUMBER = 0xFFFFFF;

    public generateRandomObject(): void {
        
    }

    private generateRandomColor(): string {
        let colorNumber:number = Math.floor(Math.random() * 6) + 1
        return colorNumber.toString(16);
    }

    private generateSize() {

    }

}