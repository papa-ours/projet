import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class FormValidationService {
  private readonly NAME_MIN_SIZE: number = 4;
  private readonly NAME_MAX_SIZE: number = 15;
  private readonly FILE_TYPE: string = "image/bmp";
  public constructor() { }

  public validateName( name: string): boolean {
    return name !== undefined &&
           name.length > this.NAME_MIN_SIZE &&
           name.length < this.NAME_MAX_SIZE;
  }
  private fileIsEmpty(file: File): boolean {
    return file === undefined;
  }
  private isBMP(file: File): boolean {
    return file.type === this.FILE_TYPE;
  }
  public imageIsValide(image: File): boolean {
    return !this.fileIsEmpty(image) && this.isBMP(image);
  }
  public isFormValide(name: string, originalImage: File, modifiedImage: File): boolean {
    return this.validateName(name) && this.isBMP(originalImage) && this.isBMP(modifiedImage);
  }
}
