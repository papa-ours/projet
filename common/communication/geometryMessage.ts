import { Vector } from "./position";

export interface GeometryData {
   position: Vector;
   rotation: Vector;
   color:    number;
   size :    number;
}

export interface SceneData {
    name: string;
    originalScene:GeometryData [];
    modifiedScene:GeometryData [];
}