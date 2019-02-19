import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class FormValidationFreeViewService {
    private static readonly NAME_MIN_SIZE: number = 5;
    private static readonly NAME_MAX_SIZE: number = 15;
    private static readonly NB_OBJECT_MIN: number = 10;
    private static readonly NB_OBJECT_MAX: number = 200;

    private static validateName(name: string): boolean {
        return  name !== undefined &&
                name.length >= this.NAME_MIN_SIZE &&
                name.length <= this.NAME_MAX_SIZE;
    }

    private static validateNbObjects(nbObjects: number): boolean {
        return (nbObjects >= this.NB_OBJECT_MIN && nbObjects <= this.NB_OBJECT_MAX);
    }

    private static validateModifications(isAdding: boolean, isColorChange: boolean, isRemoval: boolean): boolean {
        return (isAdding || isColorChange || isRemoval);
    }

    public static isFormValid(name: string, nbObjects: number, isAdding: boolean, isColorChange: boolean, removal: boolean): boolean {
        return (this.validateName(name) &&
                this.validateNbObjects(nbObjects) &&
                this.validateModifications(isAdding, isColorChange, removal));
    }

}
