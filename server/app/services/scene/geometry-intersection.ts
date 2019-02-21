import { GeometryData } from "../../../../common/communication/geometry";
import { Vector } from "./vector";

export class GeometryIntersection {

    public static intersectsWithCollection(newGeometry: GeometryData, geometries: GeometryData[]): boolean {
        return geometries.find((geometry: GeometryData) => GeometryIntersection.intersects(geometry, newGeometry)) !== undefined;
    }

    public static intersects(geometry1: GeometryData, geometry2: GeometryData): boolean {
        // La constante est sqrt(3)/2, tslint donne un warning parce que
        // le 3 et le 2 font partis d'une expression.
        // tslint:disable-next-line:no-magic-numbers
        const LONGEST_LINE_IN_A_BOX: number = Math.sqrt(3) / 2;
        const TOLERANCE: number = 5;

        const distance: Vector = Vector.fromVector(geometry1.position).sub(geometry2.position);
        const radius: number = LONGEST_LINE_IN_A_BOX * (geometry1.size + geometry2.size);

        return distance.sizeSquared() + TOLERANCE <= radius * radius;
    }

}
