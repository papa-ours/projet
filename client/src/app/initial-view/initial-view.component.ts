import { Component, OnInit, OnDestroy } from '@angular/core';
import { UsernameValidationService } from '../username-validation-service.service';
import { Message } from "../../../../common/communication/message";
import { DeleteUsernameService } from "../delete-username.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-initial-view',
  templateUrl: './initial-view.component.html',
  styleUrls: ['./initial-view.component.css']
})
export class InitialViewComponent implements OnInit, OnDestroy {

  private username: string = "";
  private usernameValidationMessage: string = "";

  constructor(private usernameValidationService: UsernameValidationService,
              private deleteUsernameService: DeleteUsernameService,
              private router: Router) { }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.deleteUsernameService.deleteUsername(this.username);
  }

  validateUsername() : void {
    this.usernameValidationService.getUsernameValidation(this.username)
      .subscribe(this.usernameValidated);
  }

  usernameValidated = (validationMessage: Message) : void => {
    this.usernameValidationMessage = validationMessage.body;
    if (this.usernameValidationMessage === "") {
      //TODO: Go to game page
      this.router.navigateByUrl('/gamelist');
    }
  };
}
