import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { VendorAndCustomerRoutingModule } from "./vendor-and-customer-routing.module";
import { VendorAndCustomerComponent } from "./components/vendor-and-customer/vendor-and-customer.component";
import { CustomMaterialModule } from "src/app/core/material.module";
import { VendorAndCustomerListComponent } from "./components/vendor-and-customer-list/vendor-and-customer-list.component";
import { VendorAndCustomerDetailComponent } from "./components/vendor-and-customer-detail/vendor-and-customer-detail.component";

import { CoreModule } from "../../core/core.module";
import { CustomerService } from "./services/customer.service";
import { VendorService } from "./services/vendor.service";
import { MAT_TABS_CONFIG } from "@angular/material";

@NgModule({
  declarations: [
    VendorAndCustomerComponent,
    VendorAndCustomerListComponent,
    VendorAndCustomerDetailComponent
  ],
  imports: [
    CommonModule,
    VendorAndCustomerRoutingModule,
    CoreModule,
    CustomMaterialModule
  ],
  providers: [
    CustomerService,
    VendorService,
    { provide: MAT_TABS_CONFIG, useValue: { animationDuration: "0ms" } }
  ]
})
export class VendorAndCustomerModule {}
