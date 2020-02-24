import { Component, OnInit, ViewChild ,ElementRef,Inject} from '@angular/core';
import { User, Employee } from 'src/app/_models';
import { AlertService } from 'src/app/_services/index';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatDialog, MatDialogConfig, MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import { MatExpansionPanel, MatSnackBar, Sort } from "@angular/material";
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employeelist',
  templateUrl: './employeelist.component.html',
  styleUrls: ['./employeelist.component.css']
})
export class EmployeelistComponent implements OnInit {
  user:User;
  model: any = {};
  public empdetails = false;
  public empeditdetails = false;
  public absentdiv = false;
  message=null;
  mainmessage=null;
  successdialog = 'none';
  updatesuccessdialog = 'none';
  absentmarkdialog = 'none';
  employeeList : any ={};
  todayNumber: number = Date.now();
  todayDate : Date = new Date();
  todayString : string = new Date().toDateString();
  todayISOString : string = new Date().toISOString();
  dtOptions: DataTables.Settings = {};
  employee:Employee;

  dialogConfig = new MatDialogConfig();
  isDtInitialized:boolean = false;
  displayedColumns: string[] = ['code','name','rank','contactNumber'];
  dataSource: MatTableDataSource<any>;
  
  @ViewChild(MatPaginator,{ static: true }) paginator: MatPaginator;
  @ViewChild(MatSort,{ static: true }) sort: MatSort;

  emptempid = null;
  

  constructor(
    private dialog: MatDialog,
    private router: Router, 
    private alertService: AlertService,
    private employeeService:EmployeeService,
  ) { 
    this.dataSource = new MatTableDataSource(this.employeeList);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit() {
    this.allemplist();
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


  employeeDetails(employeecode:string){
    if(this.emptempid!==null){
      document.getElementById(this.emptempid).style.backgroundColor='#1a2932';
      this.emptempid=null;
    } 
    //document.getElementById(this.emptempid).style.backgroundColor='#2F4756';
    this.empdetails = true;
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

  edit(){
    this.empdetails = false;
    this.empeditdetails = true;
    this.absentdiv = false;
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
  },
  error => {
    this.alertService.success("Serve Error ");
    setTimeout(() => {
      this.alertService.clear();
    }, 2000);
  }
  ); 
}

  cancelEdit(){
    this.empdetails = true;
    this.empeditdetails = false;
    this.absentdiv = false;
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

  absent(){
    this.absentdiv = true;
    this.empdetails = false;
    this.empeditdetails = false;
  }

  upload(date:string){
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
    this.absentmarkdialog = 'block';
    setTimeout(() => {
      this.absentmarkdialog = 'none';
      this.absentdiv = false;
    }, 1500);
  }

}