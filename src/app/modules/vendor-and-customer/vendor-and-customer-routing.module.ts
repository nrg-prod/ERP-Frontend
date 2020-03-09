import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { VendorAndCustomerComponent } from "./components/vendor-and-customer/vendor-and-customer.component";

const routes: Routes = [
  { path: "", component: VendorAndCustomerComponent, pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VendorAndCustomerRoutingModule {}
