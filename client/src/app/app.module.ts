import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from '@angular/forms';

import { AppComponent } from "./app.component";
import { HttpClientModule } from "@angular/common/http";
import { InitialViewComponent } from "./initial-view/initial-view.component";
import { UsernameValidationService } from "./username-validation-service.service";
import { DeleteUsernameService } from "./delete-username.service";
import { AdminViewComponent } from './admin-view/admin-view.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { SimpleGameCreationComponent } from './simple-game-creation/simple-game-creation.component';

@NgModule({
  declarations: [
    AppComponent,
    InitialViewComponent,
    AdminViewComponent,
    SimpleGameCreationComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [
    UsernameValidationService,
    DeleteUsernameService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
