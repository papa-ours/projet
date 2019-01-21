import { AdminViewComponent } from "./admin-view/admin-view.component";
import { AppRoutingModule } from "./app-routing/app-routing.module";
import { AppComponent } from "./app.component";
import { DeleteUsernameService } from "./delete-username.service";
import { DifferenceImageService } from "./difference-image.service";
import { InitialViewComponent } from "./initial-view/initial-view.component";
import { SimpleGameCreationComponent } from "./simple-game-creation/simple-game-creation.component";
import { UsernameValidationService } from "./username-validation-service.service";

import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";

@NgModule({
  declarations: [
    AppComponent,
    InitialViewComponent,
    AdminViewComponent,
    SimpleGameCreationComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
  ],
  providers: [
    UsernameValidationService,
    DeleteUsernameService,
    DifferenceImageService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
