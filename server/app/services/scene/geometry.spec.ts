import { expect } from "chai";
import { GeometryData } from "../../../../common/communication/geometry";
import { VectorInterface } from "../../../../common/communication/vector-interface";
import { Geometry } from "./geometry";

describe("Geometry", () => {
    const geometryData: GeometryData = {
        size: 0,
        position: { x: 1, y: 1, z: 1 },
        rotation: { x: 10, y: 10, z: 10 },
        color: 0,
        type: 0,
        isModified: false,
    };

    describe("position", () => {

        it("should return true if position is equal ", () => {
            const position: VectorInterface = { x: 1, y: 1, z: 1 };
            const geometry: Geometry = Geometry.fromGeometryData(geometryData);
            const result: boolean = geometry.isPositionEqual(position);

            expect(result).to.equal(true);
        });

        it("should return false if position is not equal ", () => {
            const position: VectorInterface = { x: 0, y: 1, z: 1 };
            const geometry: Geometry = Geometry.fromGeometryData(geometryData);
            const result: boolean = geometry.isPositionEqual(position);

            expect(result).to.equal(false);
        });
    });

    describe("rotation", () => {

        it("should return true if rotation is equal ", () => {
            const rotation: VectorInterface = { x: 10, y: 10, z: 10 };
            const geometry: Geometry = Geometry.fromGeometryData(geometryData);
            const result: boolean = geometry.isRotationEqual(rotation);

            expect(result).to.equal(true);
        });

        it("should return false if rotation is not equal ", () => {
            const rotation: VectorInterface = { x: 0, y: 10, z: 10 };
            const geometry: Geometry = Geometry.fromGeometryData(geometryData);
            const result: boolean = geometry.isRotationEqual(rotation);

            expect(result).to.equal(false);
        });
    });

    describe("Is equal", () => {

        it("should return true if GeometryData is equal ", () => {
            const geometry: Geometry = Geometry.fromGeometryData(geometryData);
            const result: boolean = geometry.isEqual(geometryData);

            expect(result).to.equal(true);
        });

        it("should return false if GeometryData is not equal ", () => {
            const geometryData2: GeometryData = {
                size: 0, position: { x: 100, y: 59, z: 36 },
                rotation: { x: 20, y: 15, z: 1 }, color: 36,
                type: 3, isModified: false,
            };
            const geometry: Geometry = Geometry.fromGeometryData(geometryData);
            const result: boolean = geometry.isEqual(geometryData2);

            expect(result).to.equal(false);
        });
    });

});
