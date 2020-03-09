import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

// Modules
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CustomMaterialModule } from "src/app/core/material.module";

// Components
import { HeaderComponent } from "./components/header/header.component";
import { UserAvatarComponent } from "./components/user-avatar/user-avatar.component";
import { SidebarNavComponent } from "./components/sidebar-nav/sidebar-nav.component";
import { PlaceholderComponent } from "./components/placeholder/placeholder.component";
import { HideInPrintDirective } from "./directives/hide-in-print/hide-in-print.directive";

@NgModule({
  declarations: [
    HeaderComponent,
    UserAvatarComponent,
    SidebarNavComponent,
    PlaceholderComponent,
    HideInPrintDirective
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    CustomMaterialModule
  ],
  exports: [
    HeaderComponent,
    SidebarNavComponent,
    FormsModule,
    HideInPrintDirective
  ]
})
export class CoreModule {}
