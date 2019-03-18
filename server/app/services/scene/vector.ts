import { VectorInterface } from "../../../../common/communication/vector-interface";

export class Vector implements VectorInterface {

    public constructor(
        public x: number,
        public y: number,
        public z: number,
    ) { }

    public static fromVector(other: VectorInterface): Vector {
        return new Vector(other.x, other.y, other.z);
    }

    public sizeSquared(): number {
        return this.dot(this);
    }

    public mul(k: number): Vector {
        return new Vector(k * this.x, k * this.y, k * this.z);
    }

    public add(other: VectorInterface): Vector {
        return new Vector(this.x + other.x, this.y + other.y, this.z + other.z);
    }

    public sub(other: VectorInterface): Vector {
        return this.add(Vector.fromVector(other).mul(-1));
    }

    public dot(other: VectorInterface): number {
        return this.x * other.x + this.y * other.y + this.z * other.z;
    }

    public equals(other: VectorInterface): boolean {
        return this.x === other.x && this.y === other.y && this.z === other.z;
    }
}
