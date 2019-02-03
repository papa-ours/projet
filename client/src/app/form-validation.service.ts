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

  private validateName( name: string): boolean {
    return name !== undefined &&
           name.length >= this.NAME_MIN_SIZE &&
           name.length <= this.NAME_MAX_SIZE;
  }

  private fileIsEmpty(file: File): boolean {
    if (file === undefined) {
      throw( Error("Les fichiers ne doivent pas être vide") );
    }

    return file === undefined;
  }

  private isBMP(file: File): boolean {
    try {
      this.fileIsEmpty(file);
    } catch (err) {
      throw err;
    }

    if ( file.type !== this.FILE_TYPE) {
      throw( Error("Les fichiers doivent etre dans le format Bitmap (.bmp)") );
    }

    return file.type === this.FILE_TYPE;
  }

  private createImageFromData(imageData: Uint8Array): HTMLImageElement {
    const image: HTMLImageElement = new Image();
    const imageToCharCode: string[] = imageData.toString().split(",").map(Number).map((x) => String.fromCharCode(x));
    image.src = "data:image/bmp;base64," + btoa(imageToCharCode.join(""));

    return image;
  }

  public isImageDimensionValid(imageData: Uint8Array): boolean {
    const image: HTMLImageElement = this.createImageFromData(imageData);
    const isImageDimensionRespected: boolean = (image.width === this.IMAGE_WIDTH &&
                                                image.height === this.IMAGE_HEIGHT);

    if ( !isImageDimensionRespected ) {
      throw( Error(`Les images doivent être ${this.IMAGE_WIDTH}px par ${this.IMAGE_HEIGHT}px`) );
    }

    return isImageDimensionRespected;
  }

  public isFormValid(name: string, originalImage: File, modifiedImage: File): boolean {
    return this.validateName(name) && this.isBMP(originalImage) && this.isBMP(modifiedImage);
  }
}
