import { Component, OnInit } from '@angular/core';
import { UsernameValidationService } from '../username-validation-service.service';
import { Message } from "../../../../common/communication/message";

@Component({
  selector: 'app-initial-view',
  templateUrl: './initial-view.component.html',
  styleUrls: ['./initial-view.component.css']
})
export class InitialViewComponent implements OnInit {

  private username: string;
  private usernameValidationMessage: string = "";

  constructor(private usernameValidationService: UsernameValidationService) { }

  ngOnInit() {
  }

  validateUsername() : void {
    this.usernameValidationService.getUsernameValidation(this.username)
    .subscribe(this.usernameValidated);
  }

  usernameValidated = (validationMessage: Message) : void => {
    this.usernameValidationMessage = validationMessage.body;
    if (this.usernameValidationMessage === "") {
      //TODO: Go to game page
    }
  };
}
