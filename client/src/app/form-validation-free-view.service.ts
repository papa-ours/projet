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
        if (nbObjects < 10 || nbObjects > 200){
            return false;
        }
        else return true;
    }

    public static isFormValid(name: string, nbObjects: number): boolean {
        return (this.validateName(name) && this.validateNbObjects(nbObjects));
    }

}
