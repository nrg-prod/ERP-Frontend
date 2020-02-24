import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalesorderComponent,Status } from './salesorder/salesorder.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LandingpageComponent } from '../landingpage/landingpage.component';
import { SalesinvoiceComponent,ViewInvoice, EditInvoice,Filter } from './salesinvoice/salesinvoice.component';
import { SalesreturnComponent } from './salesreturn/salesreturn.component';
import { SalesreportComponent } from './salesreport/salesreport.component';

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
import { SalesService } from './sales.service';
import { PurchaseService } from '../purchase/purchase.service';
import { Ng2CompleterModule } from 'ng2-completer';

const routes: Routes = [
      { path: 'salesorder', component: SalesorderComponent },
      { path: 'salesinvoice', component: SalesinvoiceComponent },
      { path: 'salesreturn', component: SalesreturnComponent },
      { path: 'salesreport', component: SalesreportComponent }
];


@NgModule({
  declarations: [SalesorderComponent, SalesinvoiceComponent, SalesreturnComponent, SalesreportComponent,Status,ViewInvoice,EditInvoice,Filter],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatRippleModule,
    MatTableModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
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
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    MatPaginatorModule,
    Ng2CompleterModule,
    RouterModule.forChild(routes) 

  ],
  //schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [SalesService,PurchaseService],

  entryComponents: [ViewInvoice,EditInvoice,Status,Filter],
 
  exports: [RouterModule]

})



export class SalesModule { }
