import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from '@angular/forms';

import { AppComponent } from "./app.component";
import { HttpClientModule } from "@angular/common/http";
import { InitialViewComponent } from "./initial-view/initial-view.component";
import { UsernameValidationService } from "./username-validation-service.service";

@NgModule({
  declarations: [
    AppComponent,
    InitialViewComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [UsernameValidationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
