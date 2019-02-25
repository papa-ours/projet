export class DeplacementCameraService{

    static keyPress(data: string){
        const render = document.getElementById(data);
        if (!!render) {
            render.addEventListener("keypress", (e: KeyboardEvent) => {

            });
        }
    }
}
