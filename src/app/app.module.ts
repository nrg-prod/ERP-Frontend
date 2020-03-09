import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

// Custom Modules
import { AppRoutingModule } from "./modules/app-routing/app-routing.module";
import { CoreModule } from "./core/core.module";
import { CustomMaterialModule } from "./core/material.module";

import { AppComponent } from "./app.component";

import { LoginComponent } from "./login/login.component";
import { LandingpageComponent } from "./landingpage/landingpage.component";
import {
  AlertService,
  AuthenticationService,
  UserService
} from "./_services/index";

import { NavigationComponent } from "./navigation/navigation.component";
import { DashboardWidgetComponent } from './shared/components/dashboard-widget/dashboard-widget.component';
import { DataWidgetComponent } from './shared/components/data-widget/data-widget.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LandingpageComponent,
    NavigationComponent,
    DashboardWidgetComponent,
    DataWidgetComponent

  ],

  imports: [
    AppRoutingModule,
    CoreModule,
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    HttpClientModule,
    CustomMaterialModule
  ],
  providers: [AlertService, AuthenticationService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule {}
