import { Component, OnInit, ViewChild ,ElementRef,Inject} from '@angular/core';
import { Sales } from 'src/app/_models';
import { AlertService } from 'src/app/_services';
import { Router } from '@angular/router';
import { AlertComponent } from 'src/app/_directives';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatDialog, MatDialogConfig, MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import { MatExpansionPanel, MatSnackBar, Sort } from "@angular/material";
import { PurchaseService } from 'src/app/modules/purchase/services/purchase.service';
import { SalesService } from '../../services/sales.service';

@Component({
  selector: 'app-salesreturn',
  templateUrl: './salesreturn.component.html',
  styleUrls: ['./salesreturn.component.css']
})
export class SalesreturnComponent implements OnInit {
  model: any ={};
  public customerList : any;
  public productList : any;
  public categoryList : any;
  dialogConfig = new MatDialogConfig();
  isDtInitialized:boolean = false;
  todayDate : Date = new Date();

  public returntable = false;

  fieldArray: Array<any> = [];
  returnarray: Array<any> = [];

  constructor(
    private salesService: SalesService,
    private purchaseService: PurchaseService,
    private dialog: MatDialog,
    private alertService: AlertService
  ) { 
  
  }

  ngOnInit() {
    this.getCustomerList();
    this.getcategoryList();
    this.getProductList();
    this.returntable = false;
  }

  getCustomerList(){
    this.salesService.loadCustomerList()
    .subscribe(res => { 
      this.customerList = res;
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
    this.fieldArray.push( {customerName: this.model.customerName, category: this.model.category,productName: this.model.productName,
      quantity: this.model.quantity, itemStatus: this.model.itemStatus, returnStatus: this.model.returnStatus } );
    console.log(this.fieldArray);

    this.model.customerName = null;
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
    }
    if(this.fieldArray[0]){
      this.returntable = true;
    }else{
      this.returntable = false;
    }    
  }

  saveSalesReturn(){
    this.returnarray=[];
    console.log(this.fieldArray);
    this.returnarray.push(this.fieldArray);
    console.log("Sales ReturnArray -->");
    console.log(this.returnarray);
    this.salesService.saveSalesReturn(this.returnarray)
    .subscribe(
      res => {
        console.log('............1 ....');
        this.alertService.success("Successfully saved ");
        setTimeout(() => {
          this.alertService.clear();
        }, 2000);
        this.fieldArray = [];
        this.returntable = false;
        this.model.customerName = null;
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

  cancelSalesReturn(){
    console.log("-------- cancel SalesReturn Calling -------");
    this.fieldArray = [];
    this.returntable = false;
    this.model.customerName = null;
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
