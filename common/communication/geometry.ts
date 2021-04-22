import { ThematicObjectType } from "./thematic-object";
import { VectorInterface } from "./vector-interface";

export interface GeometryData {
   position: VectorInterface;
   rotation: VectorInterface;
   color: number;
   size: VectorInterface;
   type: GeometryType;
   isModified: boolean;
   thematicObjectType?: ThematicObjectType;
}

export enum SceneType {
    GEOMETRIC,
    THEMATIC,
}

export interface SceneData {
    type: SceneType;
    name: string;
    originalScene: GeometryData[];
    modifiedScene: GeometryData[];
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
