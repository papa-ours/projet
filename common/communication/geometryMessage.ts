import { Vector } from "./position";

export interface GeometryData {
   position: Vector;
   rotation: Vector;
   color:    number;
   size :    number;
   type :    GeometryType;
   isModified: boolean;
}

export interface SceneData {
    name: string;
    originalScene:GeometryData [];
    modifiedScene:GeometryData [];
}
export enum GeometryType {
    SPHERE,
    CUBE,
    CONE,
    CYLINDER,
    PYRAMID,
}