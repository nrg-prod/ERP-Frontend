import {
  Component,
  OnInit,
  ViewChild,
  Input,
  SimpleChanges,
  OnChanges
} from "@angular/core";

import { MatTableDataSource, MatPaginator } from "@angular/material";
import { MatSnackBar } from "@angular/material/snack-bar";

import { EmployeesMock } from "src/app/config/mock/employees.mock";
import { Employee } from "./employee-list.model";
import { EmployeeDetailComponent } from "../employee-detail/employee-detail.component";
import { EmployeeService } from "../../services/employee.service";
import { AlertService } from "src/app/_services/index";
import { PrintDialogService } from "src/app/core/services/print-dialog/print-dialog.service";

@Component({
  selector: "app-employee-list",
  templateUrl: "./employee-list.component.html",
  styleUrls: ["./employee-list.component.scss"]
})
export class EmployeeListComponent implements OnInit, OnChanges {
  @Input() tabChange: boolean = false;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  // To get the child component reference after *ngIf
  private employeeDetail: EmployeeDetailComponent;
  @ViewChild(EmployeeDetailComponent, { static: false }) set content(
    content: EmployeeDetailComponent
  ) {
    setTimeout(() => {
      this.employeeDetail = content;
    }, 0);
  }

  searchText: string;
  showDetail: boolean = false;
  // employeesDS: Employee[];
  employeesDS: any = {};
  employees: MatTableDataSource<Employee>;
  employee;
  displayedColumns: string[] = [
    "code",
    "name",
    "rank",
    "contactNumber",
    "action"
  ];
  constructor(
    private employeeService: EmployeeService,
    private alertService: AlertService,
    private printDialogService: PrintDialogService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.allemplist();
    /*this.snackBar.open("Employee list SUCCESS", "dismss", {
      panelClass: ["success"],
      verticalPosition: 'top'
    });
    setTimeout(() => {
      this.snackBar.open("Employee list ERROR", "dismss", {
        panelClass: ["error"],
        verticalPosition: 'top'

      });
      setTimeout(() => {
        this.snackBar.open("Employee list WARNING", "dismss", {
          panelClass: ["warning"],
          verticalPosition: 'top'

        });
      }, 1500);
    }, 1500);*/
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log("employee tab -->"+changes.tabChange.currentValue);
    if (changes.tabChange) {
      this.allemplist();
      this.showDetail = false;
      if (this.employees) {
        this.employees.paginator = this.paginator;
      }
    }
  }

  ngAfterViewInit(): void {
    this.employees.paginator = this.paginator;
  }

  printPage(data) {
    this.printDialogService.openDialog(data);
  }

  toggleEmployeeDetailView(employeeCode?, edit?) {
    this.showDetail = !this.showDetail;
    this.employee = undefined;
    if (employeeCode) {
      const chosenEmployee = this.employeesDS.filter(
        employee => employee.employeecode === employeeCode
      );
      if (chosenEmployee.length && chosenEmployee.length > 0) {
        this.employee = chosenEmployee[0];
      }

      setTimeout(() => {
        if (edit && this.employeeDetail) {
          this.employeeDetail.isEditMode = true;
        }
      }, 50);
    }
  }

  //  deleteEmployee(employeeCode: string) {
  //   this.employeesDS = this.employeesDS.filter(
  //     employee => employee.employeecode !== employeeCode
  //    );
  //    this.employees.data = this.employeesDS;
  //  }

  allemplist() {
    this.employeeService.load().subscribe(
      (data: Employee[]) => {
        this.employeesDS = data;
        this.employees = new MatTableDataSource(this.employeesDS);
        this.employees.paginator = this.paginator;
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

  deleteEmployee(employeecode: string) {
    this.employeeService.remove(employeecode).subscribe(
      data => {
        this.employee = data;
        if (this.employee.status == "Success") {
          setTimeout(() => {
            this.snackBar.open("Employee is deleted successfully", "", {
              panelClass: ["error"],
              verticalPosition: 'top'      
            });
          });   
          this.allemplist();
          this.employees = new MatTableDataSource(this.employeesDS);
          setTimeout(() => {
            this.alertService.clear();
          }, 1500);
        } else {
          setTimeout(() => {
            this.snackBar.open("Network error: server is temporarily unavailable", "", {
              panelClass: ["error"],
              verticalPosition: 'top'      
            });
          });   
      
        }
        this.allemplist();
      },
      error => {
        setTimeout(() => {
          this.snackBar.open("Network error: server is temporarily unavailable", "", {
            panelClass: ["error"],
            verticalPosition: 'top'      
          });
        });   
		
      }
    );
  }

  applyFilter(filterValue: string) {
    this.employees.filter = filterValue.trim().toLowerCase();
    if (this.employees.paginator) {
      this.employees.paginator.firstPage();
    }
  }
}
