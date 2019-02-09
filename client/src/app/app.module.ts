import { AdminViewComponent } from "./admin-view/admin-view.component";
import { AppRoutingModule } from "./app-routing/app-routing.module";
import { AppComponent } from "./app.component";
import { ChatMessagesComponent } from "./chat-messages/chat-messages.component";
import { DifferenceCheckerService } from "./difference-checker.service";
import { DifferenceImageService } from "./difference-image.service";
import { GameImageComponent } from "./game-image/game-image.component";
import { GameListViewComponent } from "./game-list-view/game-list-view.component";
import { GameListComponent } from "./game-list/game-list.component";
import { GameSheetComponent } from "./game-sheet/game-sheet.component";
import { GameplayViewComponent } from "./gameplay-view/gameplay-view.component";
import { InitialViewComponent } from "./initial-view/initial-view.component";
import { FileReaderUtil } from "./simple-game-creation/file-reader.util";
import { SimpleGameCreationComponent } from "./simple-game-creation/simple-game-creation.component";
import { UsernameValidationService } from "./username-validation-service.service";

import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

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
        ChatMessagesComponent,
        GameImageComponent,
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule,
        AppRoutingModule,
        FontAwesomeModule,
      ],
    providers: [
        UsernameValidationService,
        DifferenceImageService,
        DifferenceCheckerService,
        FileReaderUtil,
    ],
    bootstrap: [AppComponent],
})
export class AppModule { }
