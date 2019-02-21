import { VectorInterface } from "./vector-interface";

export interface GeometryData {
   position: VectorInterface;
   rotation: VectorInterface;
   color:    number;
   size :    number;
   type :    GeometryType;
   isModified: boolean;
}

export interface SceneData {
    name: string;
    originalScene: GeometryData [];
    modifiedScene: GeometryData [];
}

export enum GeometryType {
    SPHERE,
    CUBE,
    CONE,
    CYLINDER,
    PYRAMID,
}

export enum ModificationType {
    ADD,
    DELETE,
    CHANGE_COLOR,
}

export interface Modification {
    type: ModificationType;
    isActive: boolean;
}
