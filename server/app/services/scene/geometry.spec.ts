import { expect } from "chai";
import { GeometryData } from "../../../../common/communication/geometry";
import { VectorInterface } from "../../../../common/communication/vector-interface";
import { Geometry } from "./geometry";

describe("Geometry", () => {
    const geometryData: GeometryData = {
            size: 0 , position: {x: 1, y: 1 , z: 1},
            rotation: {x: 1, y: 1 , z: 1}, color: 0,
            type: 0, isModified: false,
            };
    describe("position", () => {

        it("should return true if position is equal ", () => {
            const position: VectorInterface = {x: 1, y: 1 , z: 1};
            const geometry: Geometry =  Geometry.fromGeometryData(geometryData);
            const result: boolean = geometry.isPositionEqual(position);

            expect(result).to.equal(true);
        });

        it("should return false if position is not equal ", () => {
            const position: VectorInterface = {x: 0, y: 1 , z: 1};
            const geometry: Geometry =  Geometry.fromGeometryData(geometryData);
            const result: boolean = geometry.isPositionEqual(position);

            expect(result).to.equal(false);
        });
    });

    describe("rotation", () => {

        it("should return true if rotation is equal ", () => {
            const rotation: VectorInterface = {x: 1, y: 1 , z: 1};
            const geometry: Geometry =  Geometry.fromGeometryData(geometryData);
            const result: boolean = geometry.isPositionEqual(rotation);

            expect(result).to.equal(true);
        });

        it("should return false if rotation is not equal ", () => {
            const rotation: VectorInterface = {x: 0, y: 1 , z: 1};
            const geometry: Geometry =  Geometry.fromGeometryData(geometryData);
            const result: boolean = geometry.isPositionEqual(rotation);

            expect(result).to.equal(false);
        });
    });
    
});
