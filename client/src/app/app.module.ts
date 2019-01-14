import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from '@angular/forms';

import { AppComponent } from "./app.component";
import { BasicService } from "./basic.service";
import { HttpClientModule } from "@angular/common/http";
import { InitialViewComponent } from "./initial-view/initial-view.component";

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
  providers: [BasicService],
  bootstrap: [AppComponent]
})
export class AppModule { }
