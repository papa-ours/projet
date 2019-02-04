import { AdminViewComponent } from "./admin-view/admin-view.component";
import { AppRoutingModule } from "./app-routing/app-routing.module";
import { AppComponent } from "./app.component";
import { DifferenceImageService } from "./difference-image.service";
import { GameListViewComponent } from "./game-list-view/game-list-view.component";
import { GameListComponent } from "./game-list/game-list.component";
import { GameSheetComponent } from "./game-sheet/game-sheet.component";
import { InitialViewComponent } from "./initial-view/initial-view.component";
import { FileReaderUtil } from "./simple-game-creation/file-reader.util";
import { SimpleGameCreationComponent } from "./simple-game-creation/simple-game-creation.component";
import { UsernameValidationService } from "./username-validation-service.service";

import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { GameplayViewComponent } from "./gameplay-view/gameplay-view.component";

@NgModule({
    declarations: [
        AppComponent,
        GameListViewComponent,
        GameListComponent,
        GameSheetComponent,
        InitialViewComponent,
        AdminViewComponent,
        SimpleGameCreationComponent,
        GameplayViewComponent,
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule,
        AppRoutingModule,
      ],
    providers: [
        UsernameValidationService,
        DifferenceImageService,
        FileReaderUtil,
    ],
    bootstrap: [AppComponent],
})
export class AppModule { }
