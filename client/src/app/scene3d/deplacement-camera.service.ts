export class DeplacementCameraService{

    public static keyPress(data: string): void {
        const render = document.getElementById(data);
        if (!!render) {
            render.addEventListener("keypress", (e: KeyboardEvent) => {

            });
        }
    }
}
