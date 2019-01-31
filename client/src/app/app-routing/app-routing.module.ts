import { AdminViewComponent } from '../admin-view/admin-view.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { InitialViewComponent } from '../initial-view/initial-view.component'; 
import { GameListViewComponent } from "../game-list-view/game-list-view.component";

const ROUTES: Routes = [
  { path: "", redirectTo: "/login", pathMatch: "full" },
  { path: "login", component: InitialViewComponent },
  { path: "admin", component: AdminViewComponent },
  { path: "gamelist", redirectTo: "/login", pathMatch: "full" },
  { path: "gamelist/:username", component: GameListViewComponent },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(ROUTES)
  ],
  exports: [ 
    RouterModule 
  ]
})

export class AppRoutingModule { }