import { Component, OnInit } from "@angular/core";
import { MenuItem } from "./sidebar-nav.model";
import { SidenavItems } from "src/app/config/sidenav.config";
// import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: "app-sidebar-nav",
  templateUrl: "./sidebar-nav.component.html",
  styleUrls: ["./sidebar-nav.component.scss"]
})
export class SidebarNavComponent implements OnInit {
  menuItems: MenuItem[];
  isExpanded: boolean = true;
  constructor() {}

  ngOnInit() {
    this.menuItems = SidenavItems;
  }
}
