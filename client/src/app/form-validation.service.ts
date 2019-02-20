import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root",
})
export class FormValidationService {
    private readonly NAME_MIN_SIZE: number = 5;
    private readonly NAME_MAX_SIZE: number = 15;
    private readonly FILE_TYPE: string = "image/bmp";
    private readonly BIT_FORMAT: number = 24;

    private validateName(name: string): boolean {
        return name !== undefined &&
            name.length >= this.NAME_MIN_SIZE &&
            name.length <= this.NAME_MAX_SIZE;
    }

    private isBMP(file: File): boolean {
        if (file === undefined) {
            throw (Error("Les fichiers ne doivent pas être vide"));
        }

        if (file.type !== this.FILE_TYPE) {
            throw (Error("Les fichiers doivent etre dans le format Bitmap (.bmp)"));
        }

        return file.type === this.FILE_TYPE;
    }

    public isBitFormatValid(imageData: Uint8Array): boolean {
        const dataView: DataView = new DataView(imageData.buffer);
        const BIT_FORMAT_OFFSET: number = 28;

        const imageBitFormat: number = dataView.getUint16(BIT_FORMAT_OFFSET, true);
        const isImageBitFormatRespected: boolean = (imageBitFormat === this.BIT_FORMAT);

        if (!isImageBitFormatRespected) {
            throw new SyntaxError(`Les images doivent être en format bitmap ${this.BIT_FORMAT} bit`);
        }

        return isImageBitFormatRespected;

    }

    public isFormValid(name: string, originalImage: File, modifiedImage: File): boolean {
        return this.validateName(name) && this.isBMP(originalImage) && this.isBMP(modifiedImage);
    }
}
