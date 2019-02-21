import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root",
})
export class FormValidationService {
    private readonly NAME_MIN_SIZE: number = 5;
    private readonly NAME_MAX_SIZE: number = 15;
    private readonly FILE_TYPE: string = "image/bmp";

    private validateName(name: string): boolean {
        return name !== undefined &&
            name.length >= this.NAME_MIN_SIZE &&
            name.length <= this.NAME_MAX_SIZE;
    }

    private isBMP(file: File): boolean {
        if (file === undefined) {
            throw (TypeError("Les fichiers ne doivent pas être vide"));
        }

        if (file.type !== this.FILE_TYPE) {
            throw (TypeError("Les fichiers doivent etre dans le format Bitmap (.bmp)"));
        }

        return file.type === this.FILE_TYPE;
    }

    public isFormValid(name: string, originalImage: File, modifiedImage: File): boolean {
        return this.validateName(name) && this.isBMP(originalImage) && this.isBMP(modifiedImage);
    }
}
