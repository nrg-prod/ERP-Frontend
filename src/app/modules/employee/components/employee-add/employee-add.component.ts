import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.scss']
})
export class EmployeeAddComponent implements OnInit {

  model: any = {};
  constructor( 
    private employeeService: EmployeeService,   
    private snackBar: MatSnackBar
    ) { }

  ngOnInit() {
  }

  saveEmployee() {
    this.employeeService.save(this.model)
      .subscribe(
        data => {
          setTimeout(() => {
            this.snackBar.open("Employee created Successfully", "", {
              panelClass: ["success"],
              verticalPosition: 'top'      
            });
          });
          this.model.name = '';
          this.model.rank = '';
          this.model.phonenumber = '';
          this.model.address = '';
          this.model.email = '';
          this.model.dob = '';
          this.model.contractnumber = '';
          this.model.npwp = '';
          this.model.bpjs = '';
          this.model.monthlysalary = '';
          this.model.workHour = '';
          this.model.annualLeave = '';
        },
        error => {
          setTimeout(() => {
            this.snackBar.open("Network error: server is temporarily unavailable", "dismss", {
              panelClass: ["error"],
              verticalPosition: 'top'      
            });
          });  
        }
      );
  }
}
