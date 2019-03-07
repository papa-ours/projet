import { Component, OnInit } from "@angular/core";
import { ChatMessage } from "../../../../common/communication/message";
import { SocketService } from "../socket.service";

@Component({
    selector: "app-chat-messages",
    templateUrl: "./chat-messages.component.html",
    styleUrls: ["./chat-messages.component.css"],
})
export class ChatMessagesComponent implements OnInit {
    public chatMessages: ChatMessage[];

    public constructor(private socketService: SocketService) {
        this.chatMessages = [];
    }

    public ngOnInit(): void {
        this.socketService.getChatMessage().subscribe((message: ChatMessage) => {
            this.chatMessages.push(message);
        });
    }
}
