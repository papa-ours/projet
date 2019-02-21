import { Geometry } from "three";

export enum ShapeType {
    Sphere,
    Cube,
    Cone,
    Cylinder,
    Pyramid,
}

export interface Shape {
    type: ShapeType;
    geometry: Geometry;
}
