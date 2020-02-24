import { Component, OnInit, ViewChild ,ElementRef,Inject} from '@angular/core';
import { User, Employee } from 'src/app/_models';
import { AlertService } from 'src/app/_services/index';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatDialog, MatDialogConfig, MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import { MatExpansionPanel, MatSnackBar, Sort } from "@angular/material";
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employeedata',
  templateUrl: './employeedata.component.html',
  styleUrls: ['./employeedata.component.css']
})
export class EmployeedataComponent implements OnInit {

  model: any = {};
  employeeList : any ={};
  employee:Employee;

  public empdetails = false;
  public empeditdetails = false;
  public absentdiv = false;
  public employeelist= true;
  todayDate : Date = new Date();

  public empPreviewdiv=false;
  public empreportdetails=false;

 

  displayedColumns: string[] = ['code','name','rank','contactNumber','action'];
  dataSource: MatTableDataSource<any>;

  displayedColumns2: string[] = ['EmployeeName','Empcode'];
  dataSource1: MatTableDataSource<any>;
  empDetailsList: any;
  
  displayedColumns3: string[] = ['Date','Checkin','Checkout'];
  dataSource2: MatTableDataSource<any>;
  empAbsetList: any;

  displayedColumns4: string[] = ['EmployeeName','Empcode'];
  dataSource3: MatTableDataSource<any>;
  empDetailsList1: any;

  @ViewChild(MatPaginator,{ static: false }) paginator: MatPaginator;
  @ViewChild(MatSort,{ static: false }) sort: MatSort;

  constructor(
    private dialog: MatDialog,
    private router: Router, 
    private alertService: AlertService,
    private employeeService:EmployeeService,
  ) {
      const purchasedata1 = require("../../EmpAbsentcardTable.json");
      this.empAbsetList=purchasedata1;
      this.dataSource2 = new MatTableDataSource(this.empAbsetList);
   }

  ngOnInit() {
    this.allemplist();
  }
  mainmessage:string;
  upload(date:Date){
    if(this.model.status == "absent"){
      this.mainmessage="Absent Details was Successfully Saved...";
    }else if(this.model.status == "check In"){
      this.mainmessage="CheckIn Details was Successfully Saved...";
    }else if(this.model.status == "check Out"){
      this.mainmessage="CheckOut Details was Successfully Saved...";
    }else  if(this.model.status == null){
      this.mainmessage="Please Choose check in / early check out / absent button.";
    }

    this.empdetails = false;
    this.empeditdetails = false;
    setTimeout(() => {
      this.absentdiv = false;
    }, 1500);
  }

  
  allemplist(){
    this.employeeService.load()
    .subscribe(
      data => {
        this.employeeList = data;
        console.log("employee code -->"+this.employeeList[0].employeecode);
        this.dataSource = new MatTableDataSource(this.employeeList);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

        this.dataSource1 = new MatTableDataSource(this.employeeList);

        this.dataSource3 = new MatTableDataSource(this.employeeList);
      },
      error => {
        this.alertService.error("Network error: server is temporarily unavailable");
      }
    );
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  applyFilter2(filterValue: string) {
    this.dataSource1.filter = filterValue.trim().toLowerCase();

    if (this.dataSource1.paginator) {
      this.dataSource1.paginator.firstPage();
    }
  }

  applyFilter3(filterValue: string) {
    this.dataSource3.filter = filterValue.trim().toLowerCase();

    if (this.dataSource3.paginator) {
      this.dataSource3.paginator.firstPage();
    }
  }


  employeeDetails(employeecode:string){
    this.empdetails = true;
    this.employeelist=false;
    this.empeditdetails = false;
    this.absentdiv = false;

    for(let i=0;i<this.employeeList.length;i++){
      if(this.employeeList[i].employeecode==employeecode){
        this.model.employeecode = this.employeeList[i].employeecode;
        this.model.name = this.employeeList[i].name;
        this.model.rank = this.employeeList[i].rank;
        this.model.phonenumber = this.employeeList[i].phonenumber;
        this.model.address = this.employeeList[i].address;
        this.model.email = this.employeeList[i].email;
        this.model.dob = this.employeeList[i].dob;
        this.model.addeddate = this.employeeList[i].addeddate;
        this.model.contractnumber = this.employeeList[i].contractnumber;
        this.model.npwp = this.employeeList[i].npwp;
        this.model.bpjs = this.employeeList[i].bpjs;
        this.model.workHour = this.employeeList[i].workHour;
        this.model.annualLeave = this.employeeList[i].annualLeave;
        this.model.monthlysalary = this.employeeList[i].monthlysalary;
      }
    }

    
  }

  emplistback(){
    this.employeelist=true;
    this.empdetails = false;
    this.empeditdetails = false;
  }
addemployeeback(){}
absenceback(){}
contracttemplateback(){}
empreportback(){}

edit(employeecode: string){
  this.empeditdetails = true;
  this.empdetails = false;
  this.employeelist=false;
  this.absentdiv = false;

  for(let i=0;i<this.employeeList.length;i++){
    if(this.employeeList[i].employeecode==employeecode){
      this.model.employeecode = this.employeeList[i].employeecode;
      this.model.name = this.employeeList[i].name;
      this.model.rank = this.employeeList[i].rank;
      this.model.phonenumber = this.employeeList[i].phonenumber;
      this.model.address = this.employeeList[i].address;
      this.model.email = this.employeeList[i].email;
      this.model.dob = this.employeeList[i].dob;
      this.model.addeddate = this.employeeList[i].addeddate;
      this.model.contractnumber = this.employeeList[i].contractnumber;
      this.model.npwp = this.employeeList[i].npwp;
      this.model.bpjs = this.employeeList[i].bpjs;
      this.model.workHour = this.employeeList[i].workHour;
      this.model.annualLeave = this.employeeList[i].annualLeave;
      this.model.monthlysalary = this.employeeList[i].monthlysalary;
    }
  }
}

setEmployeeUpdate(){   
  this.employeeService.update(this.model) 
  .subscribe(
    data => {
      this.employee =   data;  
  this.alertService.success("Successfully Updated.");
  setTimeout(() => {
    this.alertService.clear();
    this.allemplist(); 
    this.empeditdetails = false;
  }, 2000);
    this.employeelist=true;
    this.empdetails = false;
    this.empeditdetails = false;
},
error => {
  this.alertService.success("Serve Error ");
  setTimeout(() => {
    this.alertService.clear();
  }, 2000);
}
); 
}

delete(employeecode: string){
  this.employeeService.remove(employeecode)
  .subscribe(
    data => {
      this.employee = data;
      if(this.employee.status == "Success"){
        this.alertService.success("Deleted Successfully");
        this.allemplist();
        this.dataSource = new MatTableDataSource(this.employeeList);
        this.empdetails = false;
        setTimeout(() => {
          this.alertService.clear();
        }, 1500);
      }else{
        this.alertService.error("Not Deleted..");
      }
      this.allemplist();
    },
    error => {
      this.alertService.error("Network error: server is temporarily unavailable");
      setTimeout(() => {
    this.alertService.clear();
  }, 2000);
  }
  ); 
}

saveEmployee() {
  this.employeeService.save(this.model)
    .subscribe(
      data => {
        this.alertService.success("Successfully Saved.");
        setTimeout(() => {
          this.alertService.clear();
        }, 2000);
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
        this.allemplist();
      },
      error => {
        this.alertService.success("Serve Error ");
        setTimeout(() => {
          this.alertService.clear();
        }, 2000);
      }
    );
}

cancelEmployee() {
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
}

//report
absentCardDetails(employeecode: string){
  this.empPreviewdiv=true;
  this.empreportdetails=true;
  for(let i=0;i<this.employeeList.length;i++){
    if(this.employeeList[i].employeecode==employeecode){
      this.model.name = this.employeeList[i].name;
      this.model.employeecode = this.employeeList[i].employeecode;
      this.model.rank = this.employeeList[i].rank;
      this.model.phonenumber = this.employeeList[i].phonenumber;
      this.model.email = this.employeeList[i].email;
      this.model.addeddate = this.employeeList[i].addeddate;
      this.model.status = this.employeeList[i].status;
    }
  }
}

empdailyreportcall(date: string){
  this.empreportdetails=true;
  for(let j=0;j<this.empAbsetList.length;j++){
    if(this.empAbsetList[j].date==date){
      this.model.date = this.empAbsetList[j].date;
    }
  }
}

}
