import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PurchaseaddComponent,Status } from './purchaseadd/purchaseadd.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//import { AlertComponent } from '../_directives';
import { PurchaseInvoiceComponent,ViewInvoice, EditInvoice,Filter } from './purchase-invoice/purchase-invoice.component';

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
import { PurchaseService } from './purchase.service';
import { PurchaseReturnComponent } from './purchase-return/purchase-return.component';
import { PurchasereportComponent } from './purchasereport/purchasereport.component';

const routes: Routes = [
  { path: 'purchaseadd', component: PurchaseaddComponent },
  { path: 'purchase-invoice', component: PurchaseInvoiceComponent },
  { path: 'purchase-return', component: PurchaseReturnComponent },
  { path: 'purchasereport', component: PurchasereportComponent },



];


@NgModule({
  declarations: [PurchaseaddComponent,ViewInvoice,EditInvoice,Status, PurchaseInvoiceComponent,Filter, PurchaseReturnComponent, PurchasereportComponent],
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
    RouterModule.forChild(routes) 

  ],
  //schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [PurchaseService],

  entryComponents: [ViewInvoice,EditInvoice,Status,Filter],

})
export class PurchaseModule { }
