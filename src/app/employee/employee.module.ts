import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeaddComponent } from './employeeadd/employeeadd.component';
import { EmployeelistComponent } from './employeelist/employeelist.component';
import { EmployeereportComponent } from './employeereport/employeereport.component';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeindexComponent } from './employeeindex/employeeindex.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { EmployeealertComponent } from './employeealert/employeealert.component';
import { TimesheetComponent } from './timesheet/timesheet.component';
import { DataTablesModule } from 'angular-datatables';
import { EmployeeService } from './employee.service';
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
import { EmployeedataComponent } from './employeedata/employeedata.component';


const routes: Routes = [

  { path: 'employeeadd', component: EmployeeaddComponent },
  { path: 'employeelist', component: EmployeelistComponent },
  { path: 'timesheet', component: TimesheetComponent },

  // no used
  { path: 'employeeindex', component: EmployeeindexComponent },
  { path: 'employeereport', component: EmployeereportComponent },
  { path: 'employeealert', component: EmployeealertComponent },
  { path: 'employeedata', component: EmployeedataComponent }
];


@NgModule({
  declarations: [EmployeeaddComponent, EmployeelistComponent, 
    EmployeereportComponent, EmployeeindexComponent, EmployeealertComponent, TimesheetComponent, EmployeedataComponent],
  imports: [
    FormsModule,
    CommonModule,MatTabsModule,ReactiveFormsModule,
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
    DataTablesModule.forRoot(),RouterModule.forChild(routes) 
  ],
  providers: [EmployeeService],

})
export class EmployeeModule { }
