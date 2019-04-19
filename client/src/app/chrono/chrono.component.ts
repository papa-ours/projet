import { Component, Input } from "@angular/core";
import { faHourglassHalf, IconDefinition } from "@fortawesome/free-solid-svg-icons";

@Component({
    selector: "app-chrono",
    templateUrl: "./chrono.component.html",
    styleUrls: ["./chrono.component.css"],
})
export class ChronoComponent {

    private isChronoRunning: boolean;
    private SECONDS_PER_MINUTE: number = 60;
    public chrono: number;
    public readonly hourglassIcon: IconDefinition = faHourglassHalf;

    public constructor() {
        this.chrono = 0;
        this.isChronoRunning = false;
    }

    @Input() public set chronoRunning(isChronoStarted: boolean) {
        isChronoStarted ? this.startChrono() : this.stopChrono();
    }

    private startChrono(): void {
        this.isChronoRunning = true;
        this.incrementChrono();
    }

    private stopChrono(): void {
        this.isChronoRunning = false;
    }

    private incrementChrono(): void {
        const ONE_SECOND: number = 1000;
        setTimeout(
            () => {
                if (this.isChronoRunning) {
                    this.chrono++;
                    this.incrementChrono();
                }
            },
            ONE_SECOND,
        );
    }

    public get formattedChrono(): string {
        const seconds: number = this.chrono % this.SECONDS_PER_MINUTE;
        const minutes: number = Math.floor(this.chrono / this.SECONDS_PER_MINUTE);

        return `${this.formatTimeUnit(minutes)}:${this.formatTimeUnit(seconds)}`;
    }

    private formatTimeUnit(n: number): string {
        const BASE: number = 10;

        return `${n < BASE ? "0" : ""}${n}`;
    }
}
