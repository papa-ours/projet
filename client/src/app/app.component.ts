import { Component, OnInit } from "@angular/core";
import * as io from "socket.io-client";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
    public readonly title: string = "LOG2990";
    public message: string;
    private socket: SocketIOClient.Socket;

    public ngOnInit(): void {
      this.socket = io.connect("http://localhost:3000");
      this.socket.on("maximum", (m: string) => {
        console.log(m);
      });
    }
}
