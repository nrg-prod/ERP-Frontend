import { Component, OnInit } from '@angular/core';
import { Purchase } from 'src/app/_models';
import { AlertService } from 'src/app/_services';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatDialog, MatDialogConfig} from "@angular/material";
import { PurchaseService } from '../../services/purchase.service';
import { MatSnackBar } from "@angular/material/snack-bar";

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
  selector: 'app-purchaseadd',
  templateUrl: './purchaseadd.component.html',
  styleUrls: ['./purchaseadd.component.scss']
})
export class PurchaseAddComponent  implements OnInit  {
  purchase:Purchase = new Purchase();
  model: any ={};
  public purchasetable = false;
  headElements = ['#ID', 'Product Name', 'Category Name', 'Quantity'];
  todayDate : Date = new Date();
  dialogConfig = new MatDialogConfig();

  fieldArray: Array<any> = [];
  purchasesearcharray: Array<any> = [];

  productList: any = {};
  categoryList: any = {};
  vendorList:  any = {};

  firstField = true;
  
  constructor( 
    private dialog: MatDialog,
    private purchaseService:PurchaseService,
    private router: Router, private alertService: AlertService,
    private snackBar: MatSnackBar
    ) { 
  }

  ngOnInit() {
    this.purchasetable = false;
    this.getcategoryList();
    this.model.sNo = 0;
    this.model.deliveryCost = 0;
    this.model.subTotal = 0;
    this.model.totalItem = 0;
    if(this.model.sNo == 0){
      this.getProductList();
    }else{

    }
  }

  getcategoryList(){
    this.purchaseService.loadCategory()
    .subscribe(res => { 
      this.categoryList = res;
      },
      error => {
        setTimeout(() => {
          this.snackBar.open("Network error: server is temporarily unavailable", "dismss", {
            panelClass: ["error"],
            verticalPosition: 'top'      
          });
        });

       // setTimeout(() => {
       //   this.alertService.error("Network error: server is temporarily unavailable");
      //  }, 2000);
      }
    );
  }

  getProductList(){
    this.purchaseService.loadItem()
    .subscribe(res => { 
      this.productList = res;
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

  getNetAmount(productName:string,quantity:string,category:string){
    console.log("productName -->"+productName);
    console.log("quantity -->"+quantity);
    if(quantity == '' || quantity == undefined){
      console.log("--- No Quantity are available ---");
    }else{
      this.purchaseService.getUnitPrice(productName,category)
      .subscribe(
        data => {
          this.purchase = data; 
          this.model.unitPrice = this.purchase.sellingprice;
          this.model.vendorName = this.purchase.vendorname+"-"+this.purchase.vendorcode;
          let res = quantity.replace(/\D/g, "");
          this.model.netAmount = Number.parseInt(res) * this.purchase.sellingprice;
          console.log("Price ---->"+this.model.unitPrice +" --netAmount -->"+this.model.netAmount);
        },
        error => {
          
        }
      );
    }
  }

  addProduct(sNo:number){    
    this.purchasetable = true;
    let totalAmount = 0.0;
    var item = 0;
    this.fieldArray.push( {vendorName: this.model.vendorName, category: this.model.category,productName: this.model.productName,
      unitPrice: this.model.unitPrice, quantity: this.model.quantity, netAmount: this.model.netAmount, description: this.model.description } );

    console.log(this.fieldArray);
    this.model.sNo = sNo+1;
    this.purchase.id = this.model.sNo;
    for(let j=0; j<this.fieldArray.length; j++){
      totalAmount += this.fieldArray[j].netAmount;
      this.model.subTotal = totalAmount;
      console.log("Add SubTotal -->"+this.model.subTotal);

      let response = this.fieldArray[j].quantity.replace(/\D/g, "");
      item += Number.parseInt(response);
      this.model.totalItem = item;
      console.log("Add Total Item -->"+this.model.totalItem);
    }
    
    if(this.model.sNo == 0){
      console.log("--- NO Vendor Choose ---");
    }else{
      this.getVendorProduct(this.model.vendorName);
    }
    // CLEAR TEXTBOX.
    this.model.category = null;
    this.model.productName = null;
    this.model.quantity = '';
    this.model.netAmount = '';
    this.model.unitPrice = '';
    this.model.description = '';
  }

  getVendorProduct(vendorName: string){
    console.log("Vendor Name -->"+vendorName);
    this.purchaseService.loadVendorItem(vendorName)
    .subscribe(res => { 
      this.productList = res;
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
  deleteFieldValue(index) {
    this.fieldArray.splice(index, 1);
    console.log("Size -->"+this.fieldArray.length);
    if(this.fieldArray.length==0){
      this.fieldArray = [];
      this.model.vendorName = '';
      this.model.sNo = 0;
      this.model.subTotal = '';
      this.model.totalItem = 0;
      this.getProductList();
    }
    this.model.sNo = this.fieldArray.length;
    if(this.fieldArray[0]){
      this.purchasetable = true;
    }else{
      this.purchasetable = false;
    }
  }

  savePurchase(){
    this.purchasesearcharray=[];
    console.log(this.fieldArray);
    this.purchasesearcharray.push(this.fieldArray);
    console.log("Purchase Array -->");
    console.log(this.purchasesearcharray);
    this.purchase.vendorName = this.model.vendorName;
    this.purchaseService.save(this.purchasesearcharray,this.model.deliveryCost)
    .subscribe(
        res => {
          console.log('............1 ....');
          setTimeout(() => {
          this.snackBar.open("Purchase Order created Successfully", "dismss", {
            panelClass: ["success"],
            verticalPosition: 'top'      
          });
        });

         this.fieldArray = [];
         this.purchasetable = false;
         this.model.vendorName = '';
         this.model.sNo = 0;
         this.model.subTotal = '';
         this.model.totalItem = 0;
         this.model.deliveryCost = '';      
         this.getProductList();               
       },
       error => {         
        setTimeout(() => {
          this.snackBar.open("Network error: server is temporarily unavailable", "dismss", {
            panelClass: ["error"],
            verticalPosition: 'top'      
          });
        });
    });
 }


  cancelEmp(){
    console.log("------ Cancel Employeee -------");
    this.fieldArray = [];
    this.purchasetable = false;
    this.model.vendorName = '';
    this.model.productName = '';
    this.model.category = '';
    this.model.sNo = 0;
    this.model.totalItem = 0;
    this.model.subTotal = '';
    this.model.deliveryCost = '';   
  }

  public getstatus(){
    this.dialogConfig.disableClose = true;
    this.dialogConfig.autoFocus = true;
    this.dialogConfig.position = {
      'top': '1000',
      left: '100'
    };
    this.dialog.open(Status,{
    //  data: {dialogTitle: "hello", dialogText: "text"},
      data: "issueId",
      height: '80%'
    }).afterClosed().subscribe(result => {
    // this.refresh();
    });
  }
  //htmlData:any;
  purchaseInvoice(){
    //this.htmlData = this.Status;
  }
  
}
