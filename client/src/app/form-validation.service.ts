import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root",
})
export class FormValidationService {
    private readonly NAME_MIN_SIZE: number = 5;
    private readonly NAME_MAX_SIZE: number = 15;
    private readonly FILE_TYPE: string = "image/bmp";
    private readonly IMAGE_WIDTH: number = 640;
    private readonly IMAGE_HEIGHT: number = 480;

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

    public isImageDimensionValid(imageData: Uint8Array): boolean {
        const dataView: DataView = new DataView(imageData.buffer);
        const WIDTH_OFFSET: number = 18;
        const HEIGHT_OFFSET: number = 22;

        const imageWidth: number = dataView.getUint16(WIDTH_OFFSET, true);
        const imageHeight: number = dataView.getUint16(HEIGHT_OFFSET, true);
        const isImageDimensionRespected: boolean = (imageWidth === this.IMAGE_WIDTH &&
            imageHeight === this.IMAGE_HEIGHT);

        if (!isImageDimensionRespected) {
            throw (Error(`Les images doivent être ${this.IMAGE_WIDTH}px par ${this.IMAGE_HEIGHT}px`));
        }

        return isImageDimensionRespected;
    }

    public isFormValid(name: string, originalImage: File, modifiedImage: File): boolean {
        return this.validateName(name) && this.isBMP(originalImage) && this.isBMP(modifiedImage);
    }
}
