import { AdminViewComponent } from '../admin-view/admin-view.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';


const ROUTES: Routes = [
  { path: "admin", component: AdminViewComponent },
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