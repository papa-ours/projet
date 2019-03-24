import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { AdminViewComponent } from "./admin-view/admin-view.component";
import { AppRoutingModule } from "./app-routing/app-routing.module";
import { AppComponent } from "./app.component";
import { ChatMessagesComponent } from "./chat-messages/chat-messages.component";
import { ConfirmActionComponent } from "./confirm-action/confirm-action.component";
import { ConnectionService } from "./connection.service";
import { DifferenceCheckerService } from "./difference-checker.service";
import { DifferenceImageService } from "./difference-image.service";
import { FreeViewGameCreationComponent } from "./free-view-game-creation/free-view-game-creation.component";
import { GameImageComponent } from "./game-image/game-image.component";
import { GameListViewComponent } from "./game-list-view/game-list-view.component";
import { GameListComponent } from "./game-list/game-list.component";
import { GameSheetComponent } from "./game-sheet/game-sheet.component";
import { Gameplay2DComponent } from "./gameplay-2d/gameplay-2d.component";
import { Gameplay3dComponent } from "./gameplay-3d/gameplay-3d.component";
import { GameplayViewComponent } from "./gameplay-view/gameplay-view.component";
import { InitialViewComponent } from "./initial-view/initial-view.component";
import { RenderService } from "./scene3d/render.service";
import { Scene3dComponent } from "./scene3d/scene3d.component";
import { SimpleGameCreationComponent } from "./simple-game-creation/simple-game-creation.component";

@NgModule({
    declarations: [
        AppComponent,
        GameListViewComponent,
        GameListComponent,
        GameSheetComponent,
        InitialViewComponent,
        AdminViewComponent,
        SimpleGameCreationComponent,
        Scene3dComponent,
        FreeViewGameCreationComponent,
        GameplayViewComponent,
        ChatMessagesComponent,
        GameImageComponent,
        Gameplay2DComponent,
        Gameplay3dComponent,
        ConfirmActionComponent,
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule,
        AppRoutingModule,
        FontAwesomeModule,
      ],
    providers: [
        ConnectionService,
        DifferenceImageService,
        DifferenceCheckerService,
        RenderService,
        GameplayViewComponent,
        Gameplay2DComponent,
        {provide: String, useValue: "stringValue"},
    ],
    bootstrap: [AppComponent],
})
export class AppModule { }
