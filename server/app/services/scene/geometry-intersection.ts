import { GeometryData } from "../../../../common/communication/geometry";
import { Vector } from "./vector";

export class GeometryIntersection {

    public static intersectsWithCollection(newGeometry: GeometryData, geometries: GeometryData[]): boolean {
        return geometries.find((geometry: GeometryData) => GeometryIntersection.intersects(geometry, newGeometry)) !== undefined;
    }

    public static intersects(geometry1: GeometryData, geometry2: GeometryData): boolean {
        const TOLERANCE: number = 5;

        const distance: Vector = Vector.fromVector(geometry1.position).sub(geometry2.position);
        const size1: Vector = Vector.fromVector(geometry1.size);
        const size2: Vector = Vector.fromVector(geometry2.size);

        return distance.size() + TOLERANCE <= size1.size() + size2.size();
    }

}
