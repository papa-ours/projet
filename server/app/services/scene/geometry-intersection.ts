import { GeometryData } from "../../../../common/communication/geometry";
import { Vector } from "./vector";

export class GeometryIntersection {

    public static intersectsWithCollection(g: GeometryData, geometries: GeometryData[]): boolean {
        for (const geometry of geometries) {
            if (GeometryIntersection.intersects(g, geometry)) {
                return true;
            }
        }

        return false;
    }

    public static intersects(g1: GeometryData, g2: GeometryData): boolean {
        // La constante est sqrt(3)/2, tslint donne un warning parce que
        // le 3 et le 2 font partis d'une expression.
        // tslint:disable-next-line:no-magic-numbers
        const LONGEST_LINE_IN_A_BOX: number = Math.sqrt(3) / 2;
        const TOLERANCE: number = 5;

        const distance: Vector = Vector.fromVector(g1.position).sub(g2.position);
        const radius: number = LONGEST_LINE_IN_A_BOX * (g1.size + g2.size);

        return distance.size2() + TOLERANCE <= radius * radius;
    }

}
