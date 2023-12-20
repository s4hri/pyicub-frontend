import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomePageComponent} from "./home-page/home-page.component";
import {ApplicationsPageComponent} from "./applications-page/applications-page.component";
import {ApplicationPageComponent} from "./application-page/application-page.component";

const routes: Routes = [
  {path:'', component:HomePageComponent},
  {path:'icub', component:ApplicationsPageComponent},
  {path:'icub/application', component:ApplicationPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
