import { Injectable } from "@angular/core";
import { FreeViewForm } from "./freeViewForm";

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
                this.NAME_MIN_SIZE <= name.length &&
                name.length <= this.NAME_MAX_SIZE;
    }

    private static validateNbObjects(nbObjects: number): boolean {
        return (nbObjects >= this.NB_OBJECT_MIN && nbObjects <= this.NB_OBJECT_MAX);
    }

    private static validateModifications(isAdding: boolean, isColorChange: boolean, isRemoval: boolean): boolean {
        return (isAdding || isColorChange || isRemoval);
    }

    public static isFormValid(freeViewForm: FreeViewForm): boolean {
        return (this.validateName(freeViewForm.name) &&
                this.validateNbObjects(freeViewForm.nbObjects) &&
                this.validateModifications(freeViewForm.isAdding, freeViewForm.isColorChange, freeViewForm.removal));
    }

}
