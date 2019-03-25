
export class Chrono {

    private static readonly MILLIS_IN_SECONDS: number = 1000;

    public timeInit: number;

    public start(): void {
        this.timeInit = Date.now();
    }

    public get time(): number {
        return (Date.now() - this.timeInit) / Chrono.MILLIS_IN_SECONDS;
    }
}
