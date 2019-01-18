import { Component, OnInit } from '@angular/core';
import { UsernameValidationService } from '../username-validation-service.service';
import { Message } from "../../../../common/communication/message";
import { DeleteUsernameService } from "../delete-username.service";

@Component({
  selector: 'app-initial-view',
  templateUrl: './initial-view.component.html',
  styleUrls: ['./initial-view.component.css']
})
export class InitialViewComponent implements OnInit {

  private username: string = "";
  private usernameValidationMessage: string = "";

  constructor(private usernameValidationService: UsernameValidationService,
              private deleteUsernameService: DeleteUsernameService) { }

  ngOnInit() {
  }

  validateUsername() : void {
    this.usernameValidationService.getUsernameValidation(this.username)
      .subscribe(this.usernameValidated);
  }

  deleteUsername() : void {
    this.deleteUsernameService.deleteUsername(this.username)
      .subscribe();
  }

  usernameValidated = (validationMessage: Message) : void => {
    this.usernameValidationMessage = validationMessage.body;
    if (this.usernameValidationMessage === "") {
      //If the user quits app, its username will be destroyed from server
      window.onbeforeunload = () => this.deleteUsername();
      
      //TODO: Go to game page
    }
  };
}
