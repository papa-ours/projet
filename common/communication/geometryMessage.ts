import { Vector } from "./position";

export interface GeometryMessage {
   position: Vector;
   rotation: Vector;
   color:    number;
   size :    number;
}