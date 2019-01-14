import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { BasicService } from "./basic.service";
import { HttpClientModule } from "@angular/common/http";
import { GameListComponent } from './game-list/game-list.component';
import { GameSheetComponent } from './game-sheet/game-sheet.component';

@NgModule({
  declarations: [
    AppComponent,
    GameListComponent,
    GameSheetComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [BasicService],
  bootstrap: [AppComponent]
})
export class AppModule { }
