import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormValidationFreeViewService {
    private readonly NAME_MIN_SIZE: number = 5;
    private readonly NAME_MAX_SIZE: number = 15;

    private validateName(name: string): boolean {
        return  name !== undefined &&
                name.length >= this.NAME_MIN_SIZE &&
                name.length <= this.NAME_MAX_SIZE;
    }

    private validateNbObjects(nbObjects: number): boolean{
        return true;
    }
    public isFormValid(name: string, nbObjects: number): boolean {
        return (this.validateName(name) && this.validateNbObjects(nbObjects));
    }
    constructor() { }
}
