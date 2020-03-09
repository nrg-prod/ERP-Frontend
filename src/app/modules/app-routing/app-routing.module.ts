import { NgModule } from "@angular/core";
import { RouterModule, Routes, PreloadAllModules } from "@angular/router";

import { LandingpageComponent } from "src/app/landingpage/landingpage.component";
import { LoginComponent } from "src/app/login/login.component";

// Modules for lazyloading
import { EmployeeModule } from "src/app/modules/employee/employee.module";
import { CategoryproductModule } from "src/app/categoryproduct/categoryproduct.module";
import { FinanceModule } from "src/app/finance/finance.module";
import { UsermgtModule } from "src/app/usermgt/usermgt.module";
import { PlaceholderComponent } from "../../core/components/placeholder/placeholder.component";
import { VendorAndCustomerModule } from "../vendor-and-customer/vendor-and-customer.module";
import { PurchaseModule } from "../purchase/purchase.module";
import { SalesModule } from "../sales/sales.module";
import { StockModule } from "../stock/stock.module";

const routes: Routes = [
  {
    path: "login",
    component: LoginComponent,
    data: { title: "Login Component" }
  },
  {
    path: "",
    component: PlaceholderComponent,
    children: [
      {
        path: "",
        pathMatch: "full",
        component: LandingpageComponent,
        data: { title: "Landing Component" }
      },
      {
        path: "employment",
        loadChildren: () =>
          import("../employee/employee.module").then(m => EmployeeModule)
      },
      {
        path: "vendor-and-customer",
        loadChildren: () =>
          import(
            "./../../modules/vendor-and-customer/vendor-and-customer.module"
          ).then(m => VendorAndCustomerModule)
      },
      {
        path: "category-and-product",
        loadChildren: () =>
          import("./../../categoryproduct/categoryproduct.module").then(
            m => CategoryproductModule
          )
      },
      {
        path: "purchase",
        loadChildren: () =>
          import("./../../modules/purchase/purchase.module").then(
            m => PurchaseModule
          )
      },
      {
        path: "sales",
        loadChildren: () =>
          import("./../../modules/sales/sales.module").then(m => SalesModule)
      },
      {
        path: "finance",
        loadChildren: () =>
          import("./../../finance/finance.module").then(m => FinanceModule)
      },
      {
        path: "stock",
        loadChildren: () =>
          import("./../../modules/stock/stock.module").then(m => StockModule)
      },
     
      {
        path: "user-management",
        loadChildren: () =>
          import("./../../usermgt/usermgt.module").then(m => UsermgtModule)
      }
    ]
  },
  { path: "**", redirectTo: "login" }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
