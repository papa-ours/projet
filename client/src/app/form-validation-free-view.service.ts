import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormValidationFreeViewService {
    private static readonly NAME_MIN_SIZE: number = 5;
    private static readonly NAME_MAX_SIZE: number = 15;

    private static validateName(name: string): boolean {
        return  name !== undefined &&
                name.length >= this.NAME_MIN_SIZE &&
                name.length <= this.NAME_MAX_SIZE;
    }

    private static validateNbObjects(nbObjects: number): boolean{
        return (nbObjects >= 10 && nbObjects <= 200);
    }

    private static validateModifications(ajout: boolean, modification: boolean, suppression: boolean): boolean{
        return (ajout || modification || suppression);
    }

    public static isFormValid(name: string, nbObjects: number, ajout: boolean, modification: boolean, suppression: boolean): boolean {
        return (this.validateName(name) && this.validateNbObjects(nbObjects) && this.validateModifications(ajout,modification,suppression));
    }

}
