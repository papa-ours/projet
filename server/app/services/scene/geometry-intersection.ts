import { GeometryData } from "../../../../common/communication/geometryMessage";

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
        return false;
    }

}
