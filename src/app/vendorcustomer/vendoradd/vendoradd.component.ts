import { Component, OnInit, ViewChild } from '@angular/core';
import { Customer,Vendor } from 'src/app/_models';
import { AlertService } from 'src/app/_services/index';
import { Router } from '@angular/router';
import { CustomerService } from '../customer.service';
import { VendorService } from '../vendor.service';
import { HttpClientModule } from '@angular/common/http';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';


@Component({
  selector: 'app-vendoradd',
  templateUrl: './vendoradd.component.html',
  styleUrls: ['./vendoradd.component.css']
})
export class VendoraddComponent implements OnInit {
  custtempid = null;
  tempid=null;
  message=null;
  mainmessage=null;

  public vendordetails=false;
  public vendoreditdetails=false;

  public vendordetailsstart=false;
  public customerdetailsstart=true;

  public customerdetails=false;
  public customereditdetails=false;

  public vendordragAndDrop =false;
  public customerdragAndDrop =false;

  successdialog = 'none';

  model:any ={};
  customer:Customer;
  vendor:Vendor = new Vendor;
  vendorList: any = {};
  customerList: any={};

  displayedColumns: string[] = ['vendorcode','name','contactnumber','action'];
  dataSource1: MatTableDataSource<any>;

  @ViewChild(MatPaginator,{ static: false }) paginator1: MatPaginator;
  @ViewChild(MatSort,{ static: false }) sort1: MatSort;
  
 

  displayedColumns2: string[] = ['customercode','name','contactnumber','action'];
  dataSource2: MatTableDataSource<any>;

  @ViewChild(MatPaginator,{ static: false }) paginator2: MatPaginator;
  @ViewChild(MatSort,{ static: false }) sort2: MatSort;

  //ngAfterViewInit() {
   // this.dataSource1.paginator = this.paginator1;
  //  this.dataSource1.sort = this.sort1;
  
  //  this.dataSource2.paginator = this.paginator2;
  //  this.dataSource2.sort = this.sort2;
 // }
  
  countryList: any = ['India', 'Malaysia', 'Indonesia', 'Singapore'];

  constructor(private router: Router,
     private alertService: AlertService,
     private vendorService: VendorService,
     private customerService: CustomerService,

      
    ) { }

  ngOnInit() {
    this.vendordetailsstart = true;
    this.customerdetailsstart = true;

    this.vendordetails = false;
    this.customerdetails = false;
    
    this.vendoreditdetails = false;
    this.customereditdetails=false;

    this.vendordragAndDrop = false;
    this.customerdragAndDrop = false;

    //document.getElementById("vendorstyle").style.borderBottom='2px solid #007bff';
   // document.getElementById("customerstyle").style.borderBottom='none';
   // document.getElementById("vendorstyle").style.fontWeight='bold';
    this.getAllVendorDetails();
    this.getAllCustomerDetails();
  }

  applyFilter(filterValue: string) {
    this.dataSource1.filter = filterValue.trim().toLowerCase();

    if (this.dataSource1.paginator) {
      this.dataSource1.paginator.firstPage();
    }
  }

  applyFilter2(filterValue: string) {
    this.dataSource2.filter = filterValue.trim().toLowerCase();

    if (this.dataSource2.paginator) {
      this.dataSource2.paginator.firstPage();
    }
  }

  getAllVendorDetails(){
    this.vendorList="";
    this.vendorService.load()
    .subscribe(
      data => {
        this.vendorList = data;
        this.dataSource1 = new MatTableDataSource(this.vendorList);
        this.dataSource1.paginator = this.paginator1;
        this.dataSource1.sort = this.sort1;
      },
      error => {
        this.alertService.error("Network error: server is temporarily unavailable");

      }
    );
  }
  getAllCustomerDetails(){
    this.customerList="";
    this.customerService.load()
    .subscribe(
      data => {
        this.customerList = data;
        this.dataSource2 = new MatTableDataSource(this.customerList);
        this.dataSource2.paginator = this.paginator2;
        this.dataSource2.sort = this.sort2;
      },
      error => {
        this.alertService.error("Network error: server is temporarily unavailable");      }
    )
  }

  //Vendor details methos start
  vendorDetails(vendorcode:string){
    //if(this.tempid!==null){
    //  document.getElementById(this.tempid).style.backgroundColor='#243641';
    //  this.tempid=null;

   // }
   // this.tempid=vendorcode;
   // document.getElementById(this.tempid).style.backgroundColor='#2F4756';
    //-- VendorDetails Div Calling --
    this.vendordetailsstart = false;
    this.customerdetailsstart = false;

    this.vendordetails = true;
    this.customerdetails = false;

    this.vendoreditdetails=false;
    this.customereditdetails = false;

    this.vendordragAndDrop = false;
    this.customerdragAndDrop = false;

    var lenth = this.vendorList.lenth;
    console.log ("vendor Size -->" + this.vendorList.length);
    console.log ("vendor code -->" + vendorcode);
    for(let j=0;j<this.vendorList.length;j++){
      console.log ("Block statement execution no." + j);
      if(this.vendorList[j].vendorcode==vendorcode)
        {
          console.log("Inside if vendor code -->"+vendorcode);
        this.model.vendorcode = this.vendorList[j].vendorcode;
        this.model.vendorName = this.vendorList[j].vendorName;
        this.model.phoneNumber = this.vendorList[j].phoneNumber;
        this.model.mobileNumber = this.vendorList[j].mobileNumber;
        this.model.address = this.vendorList[j].address;
        this.model.country = this.vendorList[j].country;
        this.model.city = this.vendorList[j].city;
        this.model.email = this.vendorList[j].email;
        this.model.lastedit = this.vendorList[j].lastedit;
        this.vendor.addeddate = this.vendorList[j].addeddate;
        break;
      }
    }
  }

  vendoreditDetails(vendorcode:string){
    this.vendoreditdetails=true;
    this.vendordetails=false;
    this.vendordetailsstart = false;
    this.customereditdetails=false;
    this.customerdragAndDrop = false;
    for(let j=0;j<this.vendorList.length;j++){
      console.log ("Block statement execution no." + j);
      if(this.vendorList[j].vendorcode==vendorcode)
        {
          console.log("Inside if vendor code -->"+vendorcode);
        this.model.vendorcode = this.vendorList[j].vendorcode;
        this.model.vendorName = this.vendorList[j].vendorName;
        this.model.phoneNumber = this.vendorList[j].phoneNumber;
        this.model.mobileNumber = this.vendorList[j].mobileNumber;
        this.model.address = this.vendorList[j].address;
        this.model.country = this.vendorList[j].country;
        this.model.city = this.vendorList[j].city;
        this.model.email = this.vendorList[j].email;
        this.model.lastedit = this.vendorList[j].lastedit;
        this.vendor.addeddate = this.vendorList[j].addeddate;
        break;
      }
    }
  }
  saveVendor(){
    this.vendorService.save(this.model)
    .subscribe(
      data => {
        this.vendor =   data;    
        console.log("Response -->"+this.vendor.status) 
        if(this.vendor.status=="success"){
          this.alertService.success("Saved Successfully");
          setTimeout(() => {
            this.alertService.clear();
            this.vendordetails=false;
            this.vendoreditdetails=false;
            this.vendordragAndDrop=false;
            this.customereditdetails=false;
            this.customerdragAndDrop = false;
          }, 2000);
          this.getAllVendorDetails();
          this.vendordetailsstart = true;
          this.vendordetails=false;
          this.vendordragAndDrop = false;

        }
        if(this.vendor.status=="failure"){
          this.alertService.error("Network error: server is temporarily unavailable");;
        }
      },
      error => {
        this.alertService.error("Network error: server is temporarily unavailable");
    setTimeout(() => {
      this.alertService.clear();
      this.vendordetails=false;
      this.vendoreditdetails=false;
      this.vendordragAndDrop=false;
      this.customereditdetails=false;
      this.customerdragAndDrop = false;
    }, 2000);
      }
    );  
  }

  vendorupdateDetails(){
    this.vendorService.update(this.model)
    .subscribe(
      data => {
        this.vendor =   data;   
        this.alertService.success("Saved Updated");
        setTimeout(() => {
          this.alertService.clear();
          this.vendordetails=false;
          this.vendoreditdetails=false;
          this.vendordragAndDrop=false;
          this.customereditdetails=false;
          this.customerdragAndDrop = false;
        }, 2000);
        this.getAllVendorDetails();
        this.vendordetailsstart = true;
        this.vendoreditdetails=false;

      },
      error => {
        this.alertService.error("Network error: server is temporarily unavailable");
        setTimeout(() => {
          this.alertService.clear();
          this.vendordetails=false;
          this.vendoreditdetails=false;
          this.vendordragAndDrop=false;
          this.customereditdetails=false;
          this.customerdragAndDrop = false;
        }, 2000);
      }
      ); 
  }
  vendorcloseMethod(){
    this.vendordetails=true;
    this.vendoreditdetails=false;
    this.vendordragAndDrop=false;
    this.customerdetails = false;
    this.customereditdetails = false;
    this.customerdragAndDrop = false;
    this.alertService.success("");
  }
  vendordragdropcloseMethod(){
    this.vendordetails=false;
    this.vendoreditdetails=false;
    this.vendordragAndDrop=false;
    this.customerdetails = false;
    this.customereditdetails = false;
    this.customerdragAndDrop = false;
    this.alertService.success("");
  }
  test(){
    //alert("test");
    this.vendordetailsstart=true;
    this.vendordetails=false;
    this.vendoreditdetails=false;
    this.vendordragAndDrop=false;
  }
  test2(){
    this.customerdetailsstart=true;
    this.customerdragAndDrop = false;
    this.customerdetails = false;
    this.customereditdetails = false;
    
  }
  vendorback(){
    this.vendordetailsstart=true;
    this.vendordetails=false;
    this.vendoreditdetails=false;
    this.vendordragAndDrop=false;
  }
  customerback(){
    this.customerdetailsstart=true;
    this.customerdragAndDrop = false;
    this.customerdetails = false;
    this.customereditdetails = false;
  }
  yourFn($event){
    //alert("test");
}
  addVendor(){
    this.vendordragAndDrop=true;
    this.vendordetailsstart = false;
    this.vendordetails=false;
    this.vendoreditdetails=false;
    this.customerdetails = false;
    this.customereditdetails = false;
    this.customerdragAndDrop = false;
    this.model.vendorName='';
    this.model.phoneNumber='';
    this.model.mobileNumber='';
    this.model.address='';
    this.model.country='';
    this.model.city='';
    this.model.email='';
  }
  vendordelete(vendorcode:string){
    this.vendorService.remove(vendorcode)
    .subscribe(
      data => {
        this.vendor = data;
        if(this.vendor.status == "Success"){
          this.alertService.success("Deleted Successfully");
          setTimeout(() => {
            this.successdialog = 'none';
            this.alertService.clear();
            this.vendordetails=false;
            this.vendordragAndDrop=false;
            this.vendoreditdetails=false;
            this.customerdetails = false;
            this.customereditdetails = false;
            this.customerdragAndDrop = false;
          }, 1500);
          this.getAllVendorDetails();
          this.vendordetailsstart=true;
          this.vendordetails=false;
          this.vendoreditdetails=false;
          this.vendordragAndDrop=false;
        }else{
          this.alertService.error("Network error: server is temporarily unavailable");
        }
        
      },
      error => {
        this.alertService.error("Network error: server is temporarily unavailable");
        setTimeout(() => {
          this.successdialog = 'none';
          this.alertService.clear();
          this.vendordetails=false;
          this.vendordragAndDrop=false;
          this.vendoreditdetails=false;
          this.customerdetails = false;
          this.customereditdetails = false;
          this.customerdragAndDrop = false;
        }, 1500);
      }
      ); 
  }




//Tab Method start
  vendorcust(vencust:number){
    if(vencust == 1){
      this.vendordetailsstart = true; // vendor details 
      this.customerdetailsstart = false;
      this.customerdetails = false;
      this.customereditdetails=false;
      this.vendordetails = false;
       document.getElementById("vendorstyle").style.borderBottom='2px solid #007bff';
       document.getElementById("customerstyle").style.borderBottom='none';
       document.getElementById("vendorstyle").style.fontWeight='bold';
       document.getElementById("customerstyle").style.fontWeight='normal';
    }else if(vencust == 2){
      this.customerdetailsstart = true; // customer  details.
      this.vendordetailsstart = false;
      
      this.customerdetails = false;
      this.customereditdetails=false;
      this.vendordetails = false;
       document.getElementById("customerstyle").style.borderBottom='2px solid #007bff';
       document.getElementById("vendorstyle").style.borderBottom='none';
       document.getElementById("vendorstyle").style.fontWeight='normal';
       document.getElementById("customerstyle").style.fontWeight='bold';
    }
  }




  //Customer method start
  customerDetails(custcode:string){
   // console.log("customer id-->"+custcode);
    //if(this.custtempid!==null){
     // document.getElementById(this.custtempid).style.backgroundColor='#243641';
    //  this.custtempid=null;

   // }
  //  this.custtempid=custcode;
  //  document.getElementById(this.custtempid).style.backgroundColor='#2F4756';
//customer div calling
    this.vendordetailsstart = false;
    this.customerdetailsstart = false;

    this.vendordetails = false;
    this.customerdetails = true;
    
    this.vendoreditdetails = false;
    this.customereditdetails=false;

    this.vendordragAndDrop = false;
    this.customerdragAndDrop = false;

    var lenth = this.customerList.lenth;
    console.log ("Cust Size -->" + this.customerList.length);
    console.log ("Cust code -->" + custcode);

    for (let i = 0; i < this.customerList.length; i++) {
      console.log ("Block statement execution no." + i);
      if(this.customerList[i].custcode==custcode){
        console.log("Inside if customer code -->"+custcode);
        this.model.custcode = this.customerList[i].custcode;
        this.model.customerName = this.customerList[i].customerName;
        this.model.phoneNumber = this.customerList[i].phoneNumber;
        this.model.mobileNumber = this.customerList[i].mobileNumber;
        this.model.address = this.customerList[i].address;
        this.model.country = this.customerList[i].country;
        this.model.city = this.customerList[i].city;
        this.model.email = this.customerList[i].email;
        this.model.lastedit = this.customerList[i].lastedit;
        this.model.addeddate = this.customerList[i].addeddate;
        break;
      }

    }
  } 
  customerEditDetails(custcode: string){
    this.customereditdetails=true;
    this.customerdetailsstart = false;
    this.customerdetails=false;
    this.vendoreditdetails=false;
    for (let i = 0; i < this.customerList.length; i++) {
      console.log ("Block statement execution no." + i);
      if(this.customerList[i].custcode==custcode){
        console.log("Inside if customer code -->"+custcode);
        this.model.custcode = this.customerList[i].custcode;
        this.model.customerName = this.customerList[i].customerName;
        this.model.phoneNumber = this.customerList[i].phoneNumber;
        this.model.mobileNumber = this.customerList[i].mobileNumber;
        this.model.address = this.customerList[i].address;
        this.model.country = this.customerList[i].country;
        this.model.city = this.customerList[i].city;
        this.model.email = this.customerList[i].email;
        this.model.lastedit = this.customerList[i].lastedit;
        this.model.addeddate = this.customerList[i].addeddate;
        break;
      }

    }
  }
  customercloseMethod(){
    this.customerdetails=true;
    this.customereditdetails=false;
    this.vendoreditdetails = false;
    this.vendordragAndDrop = false;
    this.alertService.success("");
  }
  customerdragdropcloseMethod(){
    this.customerdetails=true;
    this.customereditdetails=false;
    this.vendoreditdetails = false;
    this.vendordragAndDrop = false;
    this.customerdragAndDrop = false;
    this.alertService.success("");
  }
  customerdragdropclose(){
    this.customerdetails=false;
    this.customereditdetails=false;
    this.vendoreditdetails = false;
    this.vendordragAndDrop = false;
    this.customerdragAndDrop = false;
    this.alertService.success("");
  }
  customerupdateDetails(){
    this.customerService.update(this.model)
    .subscribe(
      data => {
        this.customer =   data;   
    this.alertService.success("Saved Successfully");
    setTimeout(() => {
      this.alertService.clear();
      this.customerdetails = false;
      this.customereditdetails=false;
      this.vendoreditdetails = false;
      this.vendordragAndDrop = false;
      this.customerdragAndDrop = false;
    }, 1500);
    this.getAllCustomerDetails();
    this.customerdetailsstart = true;
    this.customereditdetails=false;
  },
  error => {
    this.alertService.success("Serve Error ");
    setTimeout(() => {
      this.alertService.clear();
      this.customerdetails = false;
      this.customereditdetails=false;
      this.vendoreditdetails = false;
      this.vendordragAndDrop = false;
      this.customerdragAndDrop = false;
    }, 1500);
  }
  ); 
  }
  addCustomer(){
    this.customerdragAndDrop = true;
    this.customerdetailsstart = false;
    this.vendordetails=false;
    this.vendoreditdetails=false;
    this.customerdetails = false;
    this.customereditdetails = false;
    this.vendordragAndDrop = false;
    this.model.customerName='';
    this.model.phoneNumber='';
    this.model.mobileNumber='';
    this.model.address='';
    this.model.country='';
    this.model.city='';
    this.model.email='';
  }
  saveCustomer(){
    console.log("country name-->"+this.model.country);
    // call rest ful api 
    this.customerService.save(this.model)
    .subscribe(
      data => {
        this.customer =   data;    
        console.log("Response -->"+this.customer.status) 
        if(this.customer.status=="success"){
          this.alertService.success("Saved Successfully");
          setTimeout(() => {
            this.alertService.clear();
            this.alertService.clear();
            this.customerdetails = false;
            this.vendordetails=false;
            this.vendoreditdetails=false;
            this.customereditdetails=false;
            this.customerdragAndDrop = false;
          }, 2000);
          this.getAllCustomerDetails();
          this.customerdetailsstart = true;
          this.customerdragAndDrop = false;
        }
        if(this.customer.status=="failure"){
          this.alertService.error("Network error: server is temporarily unavailable");
                }
      },
      error => {
        this.alertService.success("Serve Error ");
        setTimeout(() => {
          this.alertService.clear();
          this.alertService.clear();
          this.customerdetails = false;
          this.vendordetails=false;
          this.vendoreditdetails=false;
          this.customereditdetails=false;
          this.customerdragAndDrop = false;
        }, 2000);
      }
    );  


   
  }
  customerdelete(custcode: string){
    console.log("Remove custcode-->"+this.model.custcode);
    this.customerService.remove(custcode)
    .subscribe(
      data => {
        this.customer = data;
        if(this.customer.status == "Success"){
          this.alertService.success("Deleted Successfully");
        setTimeout(() => {
          this.successdialog = 'none';
          this.alertService.clear();
          this.customerdetails = false;
          this.customereditdetails=false;
          this.vendoreditdetails = false;
          this.vendordragAndDrop = false;
          this.customerdragAndDrop = false;
        }, 1500);
        this.getAllCustomerDetails();
        this.customerdetailsstart = true;
        this.customereditdetails=false;
        this.customerdetails=false;
  }else{
    this.alertService.error("Network error: server is temporarily unavailable");
  }
},
error => {
  this.alertService.error("Network error: server is temporarily unavailable");
  setTimeout(() => {
    this.successdialog = 'none';
    this.alertService.clear();
    this.customerdetails = false;
    this.customereditdetails=false;
    this.vendoreditdetails = false;
    this.vendordragAndDrop = false;
    this.customerdragAndDrop = false;
  }, 1500);
}
); 
  }
}