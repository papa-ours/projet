import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminViewComponent } from "../admin-view/admin-view.component";
import { GameListViewComponent } from "../game-list-view/game-list-view.component";
import { GameplayViewComponent } from "../gameplay-view/gameplay-view.component";
import { InitialViewComponent } from "../initial-view/initial-view.component";
import { MatchmakingComponent } from "../matchmaking/matchmaking.component";
import { Scene3dComponent } from "../scene3d/scene3d.component";

const ROUTES: Routes = [
    { path: "", redirectTo: "/login", pathMatch: "full" },
    { path: "login", component: InitialViewComponent },
    { path: "admin", component: AdminViewComponent },
    { path: "gamelist", redirectTo: "/login", pathMatch: "full" },
    { path: "gamelist/:username", component: GameListViewComponent },
    { path: "game/:name/:type/:mode/:id", component: GameplayViewComponent},
    { path: "scene3d", component: Scene3dComponent },
    { path: "matchmaking/:name/:type/:create", component: MatchmakingComponent },
];

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        RouterModule.forRoot(ROUTES),
    ],
    exports: [
        RouterModule,
  ],
})

export class AppRoutingModule { }
