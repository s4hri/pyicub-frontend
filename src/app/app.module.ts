import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomePageComponent } from './home-page/home-page.component';
import { RobotCellComponent } from './robot-cell/robot-cell.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import { MatSidenavModule} from "@angular/material/sidenav";
import {MatButtonModule} from "@angular/material/button";
import { ApplicationsPageComponent } from './applications-page/applications-page.component';
import {HttpClientModule} from "@angular/common/http";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import { AppbarRobotCellComponent } from './appbar-robot-cell/appbar-robot-cell.component';
import { ApplicationPageComponent } from './application-page/application-page.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { AppbarApplicationCellComponent } from './appbar-application-cell/appbar-application-cell.component';


@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    RobotCellComponent,
    ApplicationsPageComponent,
    AppbarRobotCellComponent,
    ApplicationPageComponent,
    AppbarApplicationCellComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatButtonModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
