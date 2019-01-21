import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from '@angular/forms';

import { AppComponent } from "./app.component";
import { HttpClientModule } from "@angular/common/http";
import { GameListComponent } from './game-list/game-list.component';
import { GameSheetComponent } from './game-sheet/game-sheet.component';
import { InitialViewComponent } from "./initial-view/initial-view.component";
import { UsernameValidationService } from "./username-validation-service.service";
import { DeleteUsernameService } from "./delete-username.service";
import { AdminViewComponent } from './admin-view/admin-view.component';
import { AppRoutingModule } from './app-routing/app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    GameListComponent,
    GameSheetComponent,
    InitialViewComponent,
    AdminViewComponent
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
