import { injectable } from "inversify";
import { ChatTime } from "../../../common/communication/message";

@injectable()
export class GetCurrentTimeService {

    public getCurrentTime(): ChatTime {
        const currentTime: Date = new Date();

        return {hours: currentTime.getHours(),
                minutes: this.formatTime(currentTime.getMinutes()),
                seconds: this.formatTime(currentTime.getSeconds())};
    }

    private formatTime(time: number): string {
        const FIRST_TWO_DIGITS_NUMBER: number = 10;
        let timeString: string = time.toString();
        if (time < FIRST_TWO_DIGITS_NUMBER) {
            timeString = `0${timeString}`;
        }

        return timeString;
    }
}
