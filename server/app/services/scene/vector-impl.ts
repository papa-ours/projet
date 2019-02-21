import { VectorInterface } from "../../../../common/communication/vector-interface";

export class VectorImpl implements VectorInterface {

    public constructor(
        public x: number,
        public y: number,
        public z: number,
    ) {}

    public static fromVector(other: VectorInterface): VectorImpl {
        return new VectorImpl(other.x, other.y, other.z);
    }

    public size2(): number {
        return this.dot(this);
    }

    public mul(k: number): VectorImpl {
        return new VectorImpl(k * this.x, k * this.y, k * this.z);
    }

    public add(other: VectorInterface): VectorImpl {
        return new VectorImpl(this.x + other.x, this.y + other.y, this.z + other.z);
    }

    public sub(other: VectorInterface): VectorImpl {
        return this.add(VectorImpl.fromVector(other).mul(-1));
    }

    public dot(other: VectorInterface): number {
        return this.x * other.x + this.y * other.y + this.z * other.z;
    }
}
