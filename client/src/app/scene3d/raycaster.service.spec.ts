import { GeometryData } from "../../../../common/communication/geometry";

describe("RaycasterService", () => {
    const ORIGINAL_GEOMETRY: GeometryData[] = [
        {
        color: 0xFF00FF,
        size: 65,
        type: 2,
        position: { x: 0, y: 0, z: 0 },
        rotation: { x: 0, y: 0, z: 0 },
        isModified: false,
        },
    ];
    const MODIFIED_GEOMETRY: GeometryData[] = [
        {
            color: 0x00FF00,
            size: 65,
            type: 2,
            position: { x: 0, y: 0, z: 0 },
            rotation: { x: 0, y: 0, z: 0 },
            isModified: true,
        },
    ];

    it("should be created", () => {
        expect(raycasterService).toBeTruthy();
    });
});
