import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { GridsterModule } from 'angular-gridster2';
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
import { PluginManagerComponent } from './plugin-manager/plugin-manager.component';
import { Plugin1Component } from './plugins/plugin1/plugin1.component';
import { Plugin2Component } from './plugins/plugin2/plugin2.component';
import { PluginWidgetContainerComponent } from './plugin-widget-container/plugin-widget-container.component';
import { WidgetBaseComponent } from './widget-base/widget-base.component';
import { ServicesListPluginComponent } from './plugins/services-list-plugin/services-list-plugin.component';
import { ServiceListItemComponent } from './plugins/services-list-plugin/service-list-item/service-list-item.component';
import {NgxGraphModule} from "@swimlane/ngx-graph";
import { FSMWidgetComponent } from './fsmwidget/fsmwidget.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PluginDialogComponent } from './plugin-dialog/plugin-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatCheckboxModule} from "@angular/material/checkbox";
import { ApplicationArgsDialogComponent } from './application-args-dialog/application-args-dialog.component';
import {MatInputModule} from "@angular/material/input";
import { PlugindiprovaComponent } from './plugins/plugindiprova/plugindiprova.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    RobotCellComponent,
    ApplicationsPageComponent,
    AppbarRobotCellComponent,
    ApplicationPageComponent,
    AppbarApplicationCellComponent,
    PluginManagerComponent,
    Plugin1Component,
    Plugin2Component,
    PluginWidgetContainerComponent,
    WidgetBaseComponent,
    ServicesListPluginComponent,
    ServiceListItemComponent,
    FSMWidgetComponent,
    DashboardComponent,
    PluginDialogComponent,
    ApplicationArgsDialogComponent,
    PlugindiprovaComponent
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
    MatMenuModule,
    GridsterModule,
    NgxGraphModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatFormFieldModule,
    MatDialogModule,
    MatCheckboxModule,
    MatInputModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
