import { AfterViewChecked, Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { ChatMessage } from "../../../../common/communication/message";
import { SocketService } from "../socket.service";

@Component({
    selector: "app-chat-messages",
    templateUrl: "./chat-messages.component.html",
    styleUrls: ["./chat-messages.component.css"],
})
export class ChatMessagesComponent implements OnInit, AfterViewChecked {
    public chatMessages: ChatMessage[];

    @ViewChild("chatContainer") private chatContainer: ElementRef;

    public constructor(private socketService: SocketService) {
        this.chatMessages = [];
    }

    public ngOnInit(): void {
        this.socketService.getChatMessage().subscribe((message: ChatMessage) => {
            this.chatMessages.push(message);
        });
    }
    public ngAfterViewChecked(): void {
        this.scrollToBottom();
    }

    private scrollToBottom(): void {
        this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
    }
}
