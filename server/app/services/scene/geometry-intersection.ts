import { GeometryData } from "../../../../common/communication/geometry";
import { VectorImpl } from "./vectorImpl";

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
        // tslint:disable-next-line:no-magic-numbers
        const LONGEST_LINE_IN_A_BOX: number = Math.sqrt(3) / 2;

        const distance: VectorImpl = (g1.position as VectorImpl).sub(g2.position);
        const radius: number = LONGEST_LINE_IN_A_BOX * (g1.size + g2.size);

        return distance.size2() <= radius * radius;
    }

}
