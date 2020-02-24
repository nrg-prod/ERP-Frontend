import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray,Validators, FormControl } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChangeDetectorRef, ElementRef, ViewChild } from '@angular/core';
import { Sales } from 'src/app/_models';
import { AlertService } from 'src/app/_services';
import { Router } from '@angular/router';
import { AlertComponent } from 'src/app/_directives';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatDialog, MatDialogConfig} from "@angular/material";
import { SalesService } from '../sales.service';
import { PurchaseService } from 'src/app/purchase/purchase.service';
import { CompleterService, CompleterData } from 'ng2-completer';

//==== Status 
@Component({
  selector: 'status',
  styleUrls: ['./status.css'],
  templateUrl: './status.html', 
})
export class Status {


  constructor(
    public dialogRef: MatDialogRef<Status>,
    ) {

    }

  onNoClick(): void {
    this.dialogRef.close();
  }

  updateDelete(){
    console.log("updateDelete");
  }
}

@Component({
  selector: 'app-salesorder',
  templateUrl: './salesorder.component.html',
  styleUrls: ['./salesorder.component.css']
})
export class SalesorderComponent implements OnInit {
  sales:Sales = new Sales();
  model: any ={};
  public salestable = false;
  headElements = ['#ID', 'Product Name', 'Category Name', 'Quantity'];
  todayDate : Date = new Date();
  dialogConfig = new MatDialogConfig();

  fieldArray: Array<any> = [];
  firstField = true;
  salesarray: Array<any> = [];

  productList: any = {};
  categoryList: any = {};
  customerList:  any = {};

  public dataService: CompleterData;
  public searchData :any=[];
  public ErrorMsg :any;
  public ErrorHandle = false;
  constructor(
    public fb: FormBuilder,
    private dialog: MatDialog,
    private purchaseService:PurchaseService,
    private salesService:SalesService,
    private cd: ChangeDetectorRef, 
    private router: Router, 
    private alertService: AlertService,
    private completerService: CompleterService
  ) { 
    this.salesService.loadCustomerName()
    .subscribe(
      customername => { 
        this.searchData = customername;
        if (this.searchData == undefined || this.searchData == null) {
          this.ErrorHandle = true;
          this.ErrorMsg="No Such Record is Present......."
        } else {
          this.ErrorHandle = false;
          this.dataService = completerService.local(this.searchData); 
        }  
      },
      error => {
        this.alertService.error("Network error: server is temporarily unavailable");
      }
    );
  }

  ngOnInit() {
    this.salestable = false;
    this.ErrorHandle = false;
    this.getcategoryList();
    this.getProductList();
    this.model.sNo = 0;
    this.model.deliveryCost = 0;
    this.model.subTotal = 0;
  }

  getcategoryList(){
    this.purchaseService.loadCategoryName()
    .subscribe(res => { 
      this.categoryList = res;
      console.log("Category list size -->"+this.categoryList.length);

      },
      error => {
        setTimeout(() => {
          this.alertService.error("Network error: server is temporarily unavailable");
        }, 2000);
      }
    );
  }

  getProductList(){
    this.purchaseService.loadItemName()
    .subscribe(res => { 
      this.productList = res;
      console.log("Item list size -->"+this.productList.length);
      },
      error => {
        setTimeout(() => {
          this.alertService.error("Network error: server is temporarily unavailable");
        }, 2000);
      }
    );
  }

  getNetAmount(productName:string,quantity:string,category:string){
    console.log("productName -->"+productName);
    console.log("quantity -->"+quantity);
    if(quantity == '' || quantity == undefined){
      console.log("--- No Quantity are available ---");
    }else{
      this.salesService.getUnitPrice(productName,category)
      .subscribe(
        data => {
          this.sales = data; 
          this.model.unitPrice = this.sales.sellingprice;
          //this.model.customerName = this.sales.customername+"-"+this.sales.customercode;
          let res = quantity.replace(/\D/g, "");
          this.model.netAmount = Number.parseInt(res) * this.sales.sellingprice;
          console.log("Price ---->"+this.model.unitPrice +" --netAmount -->"+this.model.netAmount);
        },
        error => {
          
        }
      );
    }
  }

  addProduct(sNo:number){    
    this.salestable = true;
    let totalAmount = 0.0;
    this.fieldArray.push( {customerName: this.model.customerName, category: this.model.category,productName: this.model.productName,
      unitPrice: this.model.unitPrice, quantity: this.model.quantity, netAmount: this.model.netAmount, description: this.model.description } );

    console.log(this.fieldArray);
    this.model.sNo = sNo+1;
    this.sales.id = this.model.sNo;
    for(let j=0; j<this.fieldArray.length; j++){
      totalAmount += this.fieldArray[j].netAmount;
      this.model.subTotal = totalAmount;
      console.log("Add SUb Total -->"+this.model.subTotal);
    }
    
    // CLEAR TEXTBOX.
    this.model.category = null;
    this.model.productName = null;
    this.model.quantity = '';
    this.model.netAmount = '';
    this.model.unitPrice = '';
    this.model.description = '';
  }

  deleteFieldValue(index) {
    this.fieldArray.splice(index, 1);
    console.log("Size -->"+this.fieldArray.length);
    if(this.fieldArray.length==0){
      this.fieldArray = [];
      this.model.customerName = '';
      this.model.sNo = 0;
      this.model.subTotal = '';
    }
    this.model.sNo = this.fieldArray.length;
    if(this.fieldArray[0]){
      this.salestable = true;
    }else{
      this.salestable = false;
    }
  }

  saveSales(){
    this.salesarray=[];
    console.log(this.fieldArray);
    this.salesarray.push(this.fieldArray);
    console.log("Purchase Array -->"+this.salesarray);
    console.log(this.salesarray);
    this.sales.customerName = this.model.customerName;

    this.salesService.save(this.salesarray,this.model.deliveryCost)
    .subscribe(
       res => {
          console.log('............1 ....');
            console.log('successfully updated...');
            this.alertService.success("Successfully saved ");
            setTimeout(() => {
              this.alertService.clear();
            }, 2000);
            this.fieldArray = [];
            this.salestable = false;
            this.model.customerName = '';
            this.model.sNo = 0;
            this.model.subTotal = '';
            this.model.deliveryCost = '';
                        
       },
       error => {
        this.alertService.success("API server Issue..");
        setTimeout(() => {
          this.alertService.clear();
        }, 2000);
       });
  }

  cancelSales(){
    console.log("------ Cancel Sales -------");
    this.fieldArray = [];
    this.salestable = false;
    this.model.customerName = '';
    this.model.productName = '';
    this.model.category = '';
    this.model.sNo = 0;
    this.model.subTotal = '';
    this.model.deliveryCost = '';   
  }
  
}
