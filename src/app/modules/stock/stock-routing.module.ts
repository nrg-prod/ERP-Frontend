import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { StockComponent } from './components/stock.component';

const routes: Routes = [
  { path: "", component: StockComponent, pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StockRoutingModule {}
