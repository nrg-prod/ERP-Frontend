import { Component, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import {
  MatDialog,
  MatDialogConfig,
  MatPaginator,
  MatSort,
  MatTableDataSource
} from "@angular/material";
import { MatExpansionPanel, MatSnackBar, Sort } from "@angular/material";
import { EmployeeService } from "../../services/employee.service";

@Component({
  selector: "app-employee-absence",
  templateUrl: "./employee-absence.component.html",
  styleUrls: ["./employee-absence.component.scss"]
})
export class EmployeeAbsenceComponent implements OnInit {
  displayedColumns: string[] = ["EmployeeName", "Empcode"];
  dataSource: MatTableDataSource<any>;
  empDetailsList: any;
  employeeList: any = {};
  model: any = {};

  // TODO : Move the models out
  employees: { name: string; code: number }[];
  absentCardDetails: {
    date: string;
    checkIn: string;
    checkInReason: string;
    checkOut: string;
    checkoutReason: string;
  }[];
  previewDetails: {
    name: string;
    code: number;
    date: string;
    time: string;
    status: string;
    reason: string;
  };

  constructor(private employeeService: EmployeeService) {}

  ngOnInit() {
    this.employees = [
      {
        name: "SAM",
        code: 101201
      },
      {
        name: "PETER",
        code: 101001
      },
      {
        name: "SAM",
        code: 101001
      },
      {
        name: "BOY",
        code: 105001
      },
      {
        name: "SAM",
        code: 101301
      },
      {
        name: "BOSS",
        code: 101001
      },
      {
        name: "SAM",
        code: 102001
      },
      {
        name: "MAN",
        code: 101001
      },
      {
        name: "SAM",
        code: 101041
      },
      {
        name: "PETER",
        code: 101002
      },
      {
        name: "SAM",
        code: 101201
      },
      {
        name: "PETER",
        code: 101001
      },
      {
        name: "SAM",
        code: 101001
      },
      {
        name: "BOY",
        code: 105001
      },
      {
        name: "SAM",
        code: 101301
      },
      {
        name: "BOSS",
        code: 101001
      },
      {
        name: "SAM",
        code: 102001
      },
      {
        name: "MAN",
        code: 101001
      },
      {
        name: "SAM",
        code: 101041
      },
      {
        name: "PETER",
        code: 101002
      },
      {
        name: "SAM",
        code: 101201
      },
      {
        name: "PETER",
        code: 101001
      },
      {
        name: "SAM",
        code: 101001
      },
      {
        name: "BOY",
        code: 105001
      },
      {
        name: "SAM",
        code: 101301
      },
      {
        name: "BOSS",
        code: 101001
      },
      {
        name: "SAM",
        code: 102001
      },
      {
        name: "MAN",
        code: 101001
      },
      {
        name: "SAM",
        code: 101041
      },
      {
        name: "PETER",
        code: 101002
      }
    ];

    this.absentCardDetails = [
      {
        date: "Tuesday, 01/10/19",
        checkIn: "08.00",
        checkOut: "17.00",
        checkInReason: "Bedrest",
        checkoutReason: "Bedrest"
      },
      {
        date: "Thrusday, 03/10/19",
        checkIn: "Absent",
        checkOut: "Absent",
        checkInReason: "Check up at hospital",
        checkoutReason: "Bedrest"
      },
      {
        date: "Tuesday, 01/10/19",
        checkIn: "08.00",
        checkOut: "17.00",
        checkInReason: "Bedrest",
        checkoutReason: "Bedrest"
      },
      {
        date: "Thrusday, 03/10/19",
        checkIn: "Absent",
        checkOut: "Absent",
        checkInReason: "Check up at hospital",
        checkoutReason: "Bedrest"
      },
      {
        date: "Tuesday, 01/10/19",
        checkIn: "08.00",
        checkOut: "17.00",
        checkInReason: "Bedrest",
        checkoutReason: "Bedrest"
      },
      {
        date: "Thrusday, 03/10/19",
        checkIn: "Absent",
        checkOut: "Absent",
        checkInReason: "Check up at hospital",
        checkoutReason: "Bedrest"
      },
      {
        date: "Tuesday, 01/10/19",
        checkIn: "08.00",
        checkOut: "17.00",
        checkInReason: "Bedrest",
        checkoutReason: "Bedrest"
      },
      {
        date: "Thrusday, 03/10/19",
        checkIn: "Absent",
        checkOut: "Absent",
        checkInReason: "Check up at hospital",
        checkoutReason: "Bedrest"
      },
      {
        date: "Tuesday, 01/10/19",
        checkIn: "08.00",
        checkOut: "17.00",
        checkInReason: "Bedrest",
        checkoutReason: "Bedrest"
      },
      {
        date: "Thrusday, 03/10/19",
        checkIn: "Absent",
        checkOut: "Absent",
        checkInReason: "Check up at hospital",
        checkoutReason: "Bedrest"
      },
      {
        date: "Tuesday, 01/10/19",
        checkIn: "08.00",
        checkOut: "17.00",
        checkInReason: "Bedrest",
        checkoutReason: "Bedrest"
      },
      {
        date: "Thrusday, 03/10/19",
        checkIn: "Absent",
        checkOut: "Absent",
        checkInReason: "Check up at hospital",
        checkoutReason: "Bedrest"
      },
      {
        date: "Tuesday, 01/10/19",
        checkIn: "08.00",
        checkOut: "17.00",
        checkInReason: "Bedrest",
        checkoutReason: "Bedrest"
      },
      {
        date: "Thrusday, 03/10/19",
        checkIn: "Absent",
        checkOut: "Absent",
        checkInReason: "Check up at hospital",
        checkoutReason: "Bedrest"
      },
      {
        date: "Tuesday, 01/10/19",
        checkIn: "08.00",
        checkOut: "17.00",
        checkInReason: "Bedrest",
        checkoutReason: "Bedrest"
      },
      {
        date: "Thrusday, 03/10/19",
        checkIn: "Absent",
        checkOut: "Absent",
        checkInReason: "Check up at hospital",
        checkoutReason: "Bedrest"
      },
      {
        date: "Tuesday, 01/10/19",
        checkIn: "08.00",
        checkOut: "17.00",
        checkInReason: "Bedrest",
        checkoutReason: "Bedrest"
      },
      {
        date: "Thrusday, 03/10/19",
        checkIn: "Absent",
        checkOut: "Absent",
        checkInReason: "Check up at hospital",
        checkoutReason: "Bedrest"
      },
      {
        date: "Tuesday, 01/10/19",
        checkIn: "08.00",
        checkOut: "17.00",
        checkInReason: "Bedrest",
        checkoutReason: "Bedrest"
      },
      {
        date: "Thrusday, 03/10/19",
        checkIn: "Absent",
        checkOut: "Absent",
        checkInReason: "Check up at hospital",
        checkoutReason: "Bedrest"
      },
      {
        date: "Tuesday, 01/10/19",
        checkIn: "08.00",
        checkOut: "17.00",
        checkInReason: "Bedrest",
        checkoutReason: "Bedrest"
      },
      {
        date: "Thrusday, 03/10/19",
        checkIn: "Absent",
        checkOut: "Absent",
        checkInReason: "Check up at hospital",
        checkoutReason: "Bedrest"
      },
      {
        date: "Tuesday, 01/10/19",
        checkIn: "08.00",
        checkOut: "17.00",
        checkInReason: "Bedrest",
        checkoutReason: "Bedrest"
      },
      {
        date: "Thrusday, 03/10/19",
        checkIn: "Absent",
        checkOut: "Absent",
        checkInReason: "Check up at hospital",
        checkoutReason: "Bedrest"
      }
    ];

    this.previewDetails = {
      name: "SAM",
      code: 11234,
      date: "11 October 2019",
      time: "20:02:44",
      status: "Check Out",
      reason: "Sick"
    };

    this.employeeService.load().subscribe(
      data => {
        this.employeeList = data;
        console.log("employee code -->" + this.employeeList[0].employeecode);
        this.dataSource = new MatTableDataSource(this.employeeList);
      },
      error => {
        //this.alertService.error("Network error: server is temporarily unavailable");
      }
    );
    this.dataSource = new MatTableDataSource(this.employeeList);
  }

  objectKeys(obj) {
    return Object.keys(obj);
  }
}
