import { GeometryData, GeometryType } from "../../../../common/communication/geometry";
import { VectorInterface } from "../../../../common/communication/vector-interface";
import { Vector } from "./vector";

export class Geometry implements GeometryData {

    public constructor( public  position: VectorInterface,
                        public rotation: VectorInterface,
                        public color: number,
                        public size: number,
                        public type: GeometryType,
                        public isModified: boolean,
                       ){}

    public static fromGeometryData(other: GeometryData): Geometry {
        return new Geometry( other.position, other.rotation,
                             other.color, other.size,
                             other.type, other.isModified,
                            );
    }

    public isPositionEqual( position: VectorInterface): boolean {
        return Vector.fromVector(this.position).equals(position);
    }

    public isRotationEqual( rotation: VectorInterface): boolean {
        return Vector.fromVector(this.rotation).equals(rotation);
    }

    public isEqual(geometry: GeometryData): boolean {
        return ( this.color === geometry.color &&
                 this.size === geometry.size &&
                 this.isPositionEqual(geometry.position) &&
                 this.isRotationEqual(geometry.rotation)
                );

    }
}
