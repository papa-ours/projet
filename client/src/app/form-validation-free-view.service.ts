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

    public isFormValid(name: string): boolean {
        return this.validateName(name);
    }
    constructor() { }
}
