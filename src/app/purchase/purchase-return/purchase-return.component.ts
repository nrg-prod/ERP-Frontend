import { Component, OnInit, ViewChild ,ElementRef,Inject} from '@angular/core';
import { Purchase } from 'src/app/_models';
import { AlertService } from 'src/app/_services';
import { Router } from '@angular/router';
import { AlertComponent } from 'src/app/_directives';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatDialog, MatDialogConfig, MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import { MatExpansionPanel, MatSnackBar, Sort } from "@angular/material";
import { PurchaseService } from '../purchase.service';

@Component({
  selector: 'app-purchase-return',
  templateUrl: './purchase-return.component.html',
  styleUrls: ['./purchase-return.component.css']
})
export class PurchaseReturnComponent implements OnInit {

  model: any ={};
  public vendorList : any;
  public productList : any;
  public categoryList : any;
  dialogConfig = new MatDialogConfig();
  isDtInitialized:boolean = false;
  todayDate : Date = new Date();

  public returntable = false;

  fieldArray: Array<any> = [];
  returnarray: Array<any> = [];

  constructor(
    private purchaseService: PurchaseService,
    private dialog: MatDialog,
    private alertService: AlertService
  ) {  
  

   }

  ngOnInit() {
    this.getVendorList();
    this.getcategoryList();
    this.getProductList();
    this.returntable = false;
  }

  getVendorList(){
    this.purchaseService.loadVendor()
    .subscribe(res => { 
      this.vendorList = res;
      },
      error => {
        setTimeout(() => {
          this.alertService.error("Network error: server is temporarily unavailable");
        }, 2000);
      }
    );
  }

  getcategoryList(){
    this.purchaseService.loadCategory()
    .subscribe(res => { 
      this.categoryList = res;
      },
      error => {
        setTimeout(() => {
          this.alertService.error("Network error: server is temporarily unavailable");
        }, 2000);
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
          this.alertService.error("Network error: server is temporarily unavailable");
        }, 2000);
      }
    );
  }

  addProduct(){
    this.returntable = true;
    this.fieldArray.push( {vendorName: this.model.vendorName, category: this.model.category,productName: this.model.productName,
      quantity: this.model.quantity, itemStatus: this.model.itemStatus, returnStatus: this.model.returnStatus } );
    console.log(this.fieldArray);

    this.model.vendorName = null;
    this.model.category = null;
    this.model.productName = null;
    this.model.quantity = '';
    this.model.netAmount = '';
    this.model.unitPrice = '';
    this.model.description = '';
    $('input[type="radio"]').prop('checked', false);
    $(".itemStatus").val('');
    $(".returnStatus").val('');
  }

  deleteFieldValue(index) {
    this.fieldArray.splice(index, 1);
    console.log("Size -->"+this.fieldArray.length);
    if(this.fieldArray.length==0){
      this.fieldArray = [];
      this.model.vendorName = '';
    }
    if(this.fieldArray[0]){
      this.returntable = true;
    }else{
      this.returntable = false;
    }    
  }

  savePurchaseReturn(){
    this.returnarray=[];
    console.log(this.fieldArray);
    this.returnarray.push(this.fieldArray);
    console.log("Purchase ReturnArray -->");
    console.log(this.returnarray);
    //this.purchase.vendorName = this.model.vendorName;
    this.purchaseService.savePurchaseReturn(this.returnarray)
    .subscribe(
      res => {
        console.log('............1 ....');
        this.alertService.success("Successfully saved ");
        setTimeout(() => {
          this.alertService.clear();
        }, 2000);
        this.fieldArray = [];
        this.returntable = false;
        this.model.vendorName = null;
        this.model.category = null;
        this.model.productName = null;
        this.model.quantity = '';
        this.model.netAmount = '';
        this.model.unitPrice = '';
        this.model.description = '';
        $('input[type="radio"]').prop('checked', false);
        $(".itemStatus").val('');
        $(".returnStatus").val('');    
                        
    },
    error => {
        this.alertService.success("API server Issue..");
        setTimeout(() => {
          this.alertService.clear();
        }, 2000);
    });
  }

  cancelPurchaseReturn(){
    console.log("-------- cancel PurchaseReturn Calling -------");
    this.fieldArray = [];
    this.returntable = false;
    this.model.vendorName = null;
    this.model.category = null;
    this.model.productName = null;
    this.model.quantity = '';
    this.model.netAmount = '';
    this.model.unitPrice = '';
    this.model.description = '';
    $('input[type="radio"]').prop('checked', false);
    $(".itemStatus").val('');
    $(".returnStatus").val('');
  }
  
}

