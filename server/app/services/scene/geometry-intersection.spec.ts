import { expect } from "chai";
import { GeometryData, GeometryType } from "../../../../common/communication/geometry";
import { GeometryIntersection } from "./geometry-intersection";

// tslint:disable:max-func-body-length
// tslint:disable:no-magic-numbers
describe("scenceDataGenerator", () => {

    let geometry1: GeometryData;
    let geometry2: GeometryData;

    beforeEach(() => {
        geometry1 = {
            position: {
                x: 10,
                y: 10,
                z: 10,
            },
            rotation: {
                x: 0,
                y: 0,
                z: 0,
            },
            color: 0,
            size: 5,
            type: GeometryType.CUBE,
            isModified: false,
        };

        geometry2 = {
            position: {
                x: 10,
                y: 10,
                z: 10,
            },
            rotation: {
                x: 0,
                y: 0,
                z: 0,
            },
            color: 0,
            size: 5,
            type: GeometryType.CUBE,
            isModified: false,
        };
    });

    it("should not report intersection of distant objects", () => {
        geometry2.position.y = 100000;
        expect(GeometryIntersection.intersects(geometry1, geometry2)).to.equal(false);
    });

    it("should report intersection of two objects with same center", () => {
        expect(GeometryIntersection.intersects(geometry1, geometry2)).to.equal(true);
    });

    it("should report intersection of two touching objects", () => {
        geometry2.position.y += geometry2.size;
        expect(GeometryIntersection.intersects(geometry1, geometry2)).to.equal(true);
    });

    it("should report intersection of two sufficiently near objects", () => {
        geometry2.position.y += geometry2.size + 1;
        expect(GeometryIntersection.intersects(geometry1, geometry2)).to.equal(true);
    });

    it("should not report intersection of two sufficiently far objects", () => {
        geometry2.position.y += geometry2.size + 10;
        expect(GeometryIntersection.intersects(geometry1, geometry2)).to.equal(false);
    });

});
