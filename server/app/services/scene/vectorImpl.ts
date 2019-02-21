import { Vector } from "../../../../common/communication/position";

export class VectorImpl implements Vector {

    public constructor(
        public x: number,
        public y: number,
        public z: number,
    ) {}

}
