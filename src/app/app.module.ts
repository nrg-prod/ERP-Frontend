import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from'@angular/common/http';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavigationComponent } from './navigation/navigation.component';

import { RouterModule, Routes } from "@angular/router";
import { CustomMaterialModule } from "./core/material.module";

import { LoginComponent } from './login/login.component';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SalesModule } from './sales/sales.module';
import { EmployeeModule } from './employee/employee.module';
import { VendorcustomerModule } from './vendorcustomer/vendorcustomer.module';
import { CategoryproductModule } from './categoryproduct/categoryproduct.module';
import { PurchaseModule } from './purchase/purchase.module';
import { FinanceModule } from './finance/finance.module';
import { StockModule } from './stock/stock.module'; 
import { UsermgtModule } from './usermgt/usermgt.module';
import { ReportModule } from './report/report.module';
import { AlertComponent } from './_directives/index';
import { AlertService, AuthenticationService,UserService } from './_services/index';

import { MatDialogModule, MatFormFieldModule } from '@angular/material';
import { FontAwesomeModule } from 'fontawesome';
import {
  MatAutocompleteModule,
  MatBadgeModule, 
  MatBottomSheetModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatTreeModule,
} from '@angular/material';
import { MatMomentDateModule} from '@angular/material-moment-adapter';


const appRoutes: Routes = [
  //{ path: '', component: FirstComponent, data: { title: 'First Component' } },
  { path: 'dashboard', component: DashboardComponent, data: { title: 'Dashboard Component' } },
  { path: 'login', component: LoginComponent, data: { title: 'Login Component' }},
  { path: 'landingpage', component: LandingpageComponent, data: { title: 'Landing Component' },
    children: [
     /*{ path: '', loadChildren: () => EmployeeModule },
      { path: '', loadChildren: () => VendorcustomerModule },
      { path: '', loadChildren: () => CategoryproductModule },
      { path: '', loadChildren: () => PurchaseModule },
      { path: '', loadChildren: () => SalesModule },
      { path: '', loadChildren: () => FinanceModule },
      { path: '', loadChildren: () => StockModule },
      { path: '', loadChildren: () => ReportModule },
      { path: '', loadChildren: () => UsermgtModule }*/



      { path: '', loadChildren: './employee/employee.module#EmployeeModule'   },
      { path: '', loadChildren: './vendorcustomer/vendorcustomer.module#VendorcustomerModule'  },
      { path: '', loadChildren: './categoryproduct/categoryproduct.module#CategoryproductModule' },
      { path: '', loadChildren: './purchase/purchase.module#PurchaseModule'  },
      { path: '', loadChildren: './sales/sales.module#SalesModule'   },
      { path: '', loadChildren: './finance/finance.module#FinanceModule'  },
      { path: '', loadChildren: './stock/stock.module#StockModule'  },
      { path: '', loadChildren: './report/report.module#ReportModule'  },
      { path: '', loadChildren: './usermgt/usermgt.module#UsermgtModule'  }

    ],
  },

  { path: '**', redirectTo: 'login' }
];
@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    LoginComponent,
    LandingpageComponent,   
    DashboardComponent,
    AlertComponent,
  ],
 
  imports: [
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    MatPaginatorModule,
    MatDialogModule,
    RouterModule.forRoot(
      appRoutes,
      { useHash: true , onSameUrlNavigation: 'reload'} // <-- debugging purposes only
    ),
    CustomMaterialModule,
    EmployeeModule,
    VendorcustomerModule,
    CategoryproductModule,
    PurchaseModule,
    SalesModule,
    FinanceModule,
    StockModule,
    ReportModule,
    UsermgtModule,
    MatDialogModule,
    //FontAwesomeModule.forRoot() 
    MatMomentDateModule
  ],
  providers: [AlertService,AuthenticationService,UserService],
  bootstrap: [AppComponent],
})
export class AppModule { }
