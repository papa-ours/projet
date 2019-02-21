import { Vector } from "../../../../common/communication/position";

export class VectorImpl implements Vector {

    public constructor(
        public x: number,
        public y: number,
        public z: number,
    ) {}

    public size2(): number {
        return this.dot(this);
    }

    public size(): number {
        return Math.sqrt(this.size2());
    }

    public mul(k: number): VectorImpl {
        return new VectorImpl(k * this.x, k * this.y, k * this.z);
    }

    public add(other: Vector): VectorImpl {
        return new VectorImpl(this.x + other.x, this.y + other.y, this.z + other.z);
    }

    public sub(other: Vector): VectorImpl {
        return this.add((other as VectorImpl).mul(-1));
    }

    public dot(other: Vector): number {
        return this.x * other.x + this.y * other.y + this.z * other.z;
    }
}
