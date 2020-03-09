import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

// Components
import { EmployeeComponent } from "./components/employee/employee.component";

const routes: Routes = [
  { path: "", component: EmployeeComponent, pathMatch: "full" }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule {}
