import { AfterViewChecked, Component, ElementRef, OnDestroy, ViewChild } from "@angular/core";
import { Subscription } from "rxjs";
import { ChatMessage } from "../../../../common/communication/message";
import { SocketService } from "../socket.service";

@Component({
    selector: "app-chat-messages",
    templateUrl: "./chat-messages.component.html",
    styleUrls: ["./chat-messages.component.css"],
})
export class ChatMessagesComponent implements AfterViewChecked, OnDestroy {
    public chatMessages: ChatMessage[];
    private chatSubscription: Subscription;

    @ViewChild("chatContainer") private chatContainer: ElementRef;

    public constructor(private socketService: SocketService) {
        this.chatMessages = [];
        this.chatSubscription = this.socketService.getChatMessage().subscribe((message: ChatMessage) => {
            this.chatMessages.push(message);
        });
    }

    public ngOnDestroy(): void {
        this.chatSubscription.unsubscribe();
    }

    public ngAfterViewChecked(): void {
        this.scrollToBottom();
    }

    private scrollToBottom(): void {
        this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
    }
}
