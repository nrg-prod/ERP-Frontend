import { Component, OnInit, ViewChild ,ElementRef,Inject} from '@angular/core';
import { Sales, User, Category } from 'src/app/_models';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatDialog, MatDialogConfig, MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import { MatExpansionPanel, MatSnackBar, Sort } from "@angular/material";
import { PurchaseService } from 'src/app/modules/purchase/services/purchase.service';
import { SalesService } from '../../services/sales.service';

//---------- View Invoice Calling -----------
@Component({
  selector: 'viewInvoice',
  styleUrls: ['./viewInvoice.css'],
  templateUrl: './viewInvoice.html', 
})
export class ViewInvoice {
  model: any ={};
  sales: Sales;
  public salesViewList : any;
  dialogConfig = new MatDialogConfig();
  isDtInitialized:boolean = false;
  constructor(
    private salesService: SalesService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<ViewInvoice>,
    @Inject(MAT_DIALOG_DATA) public data: any) 
    {  
      this.model.soDate = this.data.date;
      let totalCommission = 0.0;
      this.model.status = this.data.currentStatus;
      this.salesService.get(this.data.invoice)
      .subscribe(
        data => {
          this.salesViewList = data;
          for(let i=0; i<this.salesViewList.length; i++){
            this.model.invoiceNumber = this.salesViewList[0].invoicenumber;
            totalCommission +=  this.salesViewList[i].subtotal;
            this.model.subTotal = totalCommission;
          }
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
      
      this.model.customername  = this.data.name;       
      this.customerDetails(this.model.customername);
  }
  ngOnInit() {

  }

  customerDetails(customername: string){
    this.salesService.getCustomerDetails(customername)
    .subscribe(
      data => {
        this.sales = data;
        console.log("Vendor Name -->"+this.sales.customerName);
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
  onNoClick(): void {
    this.dialogRef.close();
  }
}
//---------- Edit Invoice Calling -----------
@Component({
  selector: 'editinvoice',
  styleUrls: ['./editinvoice.css'],
  templateUrl: './editinvoice.html', 
})

export class EditInvoice {
  model: any ={};
  sales: Sales = new Sales;
  sales1: Sales = new Sales;
  public salesEditList : any;
  public productList : any;
  public categoryList : any;
  public statusList : any;
  dialogConfig = new MatDialogConfig();
  isDtInitialized:boolean = false;

  public salesList:Array<Sales> = [ ];
  saleseditarray: Array<any> = [];

  constructor(
    private salesService: SalesService,
    private purchaseService: PurchaseService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<EditInvoice>,
    @Inject(MAT_DIALOG_DATA) public data: any)
    {  
      this.model.invoiceNumber = this.data.invoice;
      this.model.currentStatus = this.data.status;
      this.editDetails(this.model.invoiceNumber);
      this.getProductList();
      this.getcategoryList();
      this.statusList = ['Pending','On Progress','Success'];
  }

  getcategoryList(){
    this.purchaseService.loadCategoryName()
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
      }
    );
  }

  getProductList(){
    this.purchaseService.loadItemName()
    .subscribe(res => { 
      this.productList = res;
      },
      error => {
        setTimeout(() => {
          this.snackBar.open("Network error: server is temporarily unavailable", "dismss", {
            panelClass: ["error"],
            verticalPosition: 'top'      
          });
        });          }
    );
  }

  editDetails(invoiceNumber:string){
    this.salesService.geteditDetails(invoiceNumber)
    .subscribe(
      data => {
        this.salesEditList = data;
        console.log("Length -->"+this.salesEditList.length);
        if(this.salesEditList.length == 0){
          console.log("--- No data Found ---");
        }else{
          
          for(let i=0;i<this.salesEditList.length;i++){
            console.log("--- category name ---"+this.salesEditList[i].category);
            console.log("--- product name ---"+this.salesEditList[i].itemname);
            console.log("--- s.no ---"+this.salesEditList[i].id);
            this.sales = new Sales;
            this.sales.productName = this.salesEditList[i].itemname;
            this.sales.category = this.salesEditList[i].category;
            this.sales.description = this.salesEditList[i].description;
            this.sales.quantity = this.salesEditList[i].qty;
            this.sales.netAmount = this.salesEditList[i].subtotal;
            this.sales.id = this.salesEditList[i].id;
            this.sales.price = this.salesEditList[i].unitprice;
            this.sales.invoiceNumber = this.salesEditList[i].invoicenumber;
            this.sales.soDate = this.salesEditList[i].soDate;
            this.salesList.push(this.sales);
          }

          for(let j=0; j<this.salesList.length; j++){
            console.log("Sales Item Name ------>"+this.salesList[j].productName);
            console.log("Sales Quantity ------>"+this.salesList[j].quantity);
            console.log("Sales Description ------>"+this.salesList[j].description);
          }

        }
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

  onNoClick(): void {
    this.dialogRef.close();
  }

  public deleteSalesInvoice(id:string,invoiceNumber:string){
    this.salesService.removePartId(id,invoiceNumber)
    .subscribe(
      data => {
        this.model = data;
        if(this.model.status == "Success"){
          setTimeout(() => {
            this.snackBar.open("Sales Invoice deleted Successfully", "dismss", {
              panelClass: ["success"],
              verticalPosition: 'top'      
            });
          });
          this.model.currentStatus = this.data.status;
        }else{
          setTimeout(() => {
            this.snackBar.open("Network error: server is temporarily unavailable", "dismss", {
              panelClass: ["error"],
              verticalPosition: 'top'      
            });
          });   
        }
        
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

  getTotalAmount(productName:string,qty:string,category:string,id:string){
    var index;
    console.log("Sales productName ==>"+productName);
    console.log("Sales Qty ==>"+qty);
    console.log("Sales category ==>"+category);
    console.log("Sales Input ID ---->"+id);
    for (var i = 0; i < this.salesList.length ; i++) {
      console.log("Sales Database ID  -------->"+this.salesList[i].id);
      if (this.salesList[i].id === id) {
        console.log("Index value --->"+i);
        index = i;
      }
    }
    this.salesService.getUnitPrice(productName,category)
    .subscribe(
      data => {
        this.sales = data; 
        console.log("Get UnitPrice  ----->"+this.sales.sellingprice);
        let res = qty.replace(/\D/g, "");
        this.sales.totalAmount = Number.parseInt(res) * this.sales.sellingprice;
        console.log("Onchange Total Amount  ----->"+this.sales.totalAmount);
        this.salesList[index].netAmount = this.sales.totalAmount;
        this.salesList[index].price = this.sales.sellingprice;
        
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

  updateInvoice(){
    this.sales = new Sales;
    for(let j=0; j<this.salesList.length; j++){
      console.log("Edited Sales Category Name ------>"+this.salesList[j].category);
      console.log("Edited Sales Item Name ------>"+this.salesList[j].productName);
      console.log("Edited Sales description ------>"+this.salesList[j].description);
      console.log("Edited Sales quantity ------>"+this.salesList[j].quantity);
      console.log("Edited Sales unitPrice ------>"+this.salesList[j].price);
      console.log("Edited Sales netAmount ------>"+this.salesList[j].netAmount);
      console.log("Edited Sales ObjectID ------>"+this.salesList[j].id);
      console.log("Edited Sales invoiceNumber ------>"+this.salesList[j].invoiceNumber);
      console.log("Edited Sales SODate ------>"+this.salesList[j].soDate);
    }

    console.log(this.salesList);
    this.saleseditarray.push(this.salesList);
    console.log(this.saleseditarray);

    this.salesService.update(this.saleseditarray)
    .subscribe(
      data => {
        this.sales = data; 
        this.dialogRef.close();
        setTimeout(() => {
          this.snackBar.open("Sales Invoice updated Successfully", "dismss", {
            panelClass: ["success"],
            verticalPosition: 'top'      
          });
        });
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

  cancelInvoice(){
    this.dialogRef.close();
  }

}

//------ Filter Calling --------
@Component({
  selector: 'filter',
  styleUrls: ['./filter.css'],
  templateUrl: './filter.html', 
})
export class Filter {
  model: any = {};
  public sortedList: any = {};
  constructor(
    public dialogRef: MatDialogRef<Filter>,
    private salesservice: SalesService,
    ) {
      console.log("getCustomerList");
      this.salesservice.loadCustomerList()
      .subscribe(res => { 
        this.sortedList = res;
        console.log("customer list size -->"+this.sortedList.length);
  
        },
        error => {
          setTimeout(() => {
          }, 2000);
        }
      );
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

  apply(){

  }
}

@Component({
  selector: 'app-salesinvoice',
  templateUrl: './salesinvoice.component.html',
  styleUrls: ['./salesinvoice.component.scss']
})
export class SalesinvoiceComponent implements OnInit {
  sales:Sales;
  model: any ={};
  public salesList : any;
  dialogConfig = new MatDialogConfig();
  isDtInitialized:boolean = false;
  displayedColumns: string[] = ['date','invoicenumber','productName','customername','Qty','Subtotal','deliverycost','total','status','Action'];
  dataSource: MatTableDataSource<any>;
  
  @ViewChild(MatPaginator,{ static: true }) paginator: MatPaginator;
  @ViewChild(MatSort,{ static: true }) sort: MatSort;

  constructor(
    private dialog: MatDialog,
    private router: Router, 
    private salesservice: SalesService,
    private snackBar: MatSnackBar

    ) { 
      this.salesservice.load().subscribe(res => { 
        this.salesList = res;
        //var ks = $('#keywords').val().split("\n");
        //console.log("Qty List -->"+this.salesList[1].quantity);
        this.dataSource = new MatTableDataSource(this.salesList);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;  
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

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openfilter() { 
    this.salesservice.loadfilterData(this.model)
    .subscribe(
      res => { 
        this.salesList = res;
        if(this.salesList.length == 0){
          setTimeout(() => {
            this.snackBar.open("Network error: server is temporarily unavailable", "dismss", {
              panelClass: ["error"],
              verticalPosition: 'top'      
            });
          });  
          this.dataSource = new MatTableDataSource();
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort; 
        }else{
          this.dataSource = new MatTableDataSource(this.salesList);  
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;  
        }     
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
    /*const dialogRef = this.dialog.open(Filter, {
    width: '60%',
    //  data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });*/
  }  

  public viewinvoice(invoiceNumber:string,customerName:string,invoicedate: string,status:string){
    console.log("View Invoice Number  --->"+invoiceNumber);
    this.dialogConfig.disableClose = true;
    this.dialogConfig.autoFocus = true;
    this.dialogConfig.position = {
      'top': '1000',
      left: '100'
    };
    this.dialog.open(ViewInvoice,{
      panelClass: 'viewInvoice',
      data: { invoice: invoiceNumber, name: customerName,date: invoicedate,currentStatus:status },
      height: '80%'
    }).afterClosed().subscribe(result => {
      // this.refresh();
    });
  }

  public editinvoice(invoiceNumber:string,status:string){
    console.log("Edit Invoice Number  --->"+invoiceNumber);
    this.dialogConfig.disableClose = true;
    this.dialogConfig.autoFocus = true;
    this.dialogConfig.position = {
      'top': '1000',
      left: '100'
    };
    this.dialog.open(EditInvoice,{
      panelClass: 'editInvoice',
      data: { invoice: invoiceNumber, status: status },
      height: '80%'
    }).afterClosed().subscribe(result => {
      // this.refresh();
      this.getAllSODetails();
    });
  }

  getAllSODetails(){
    this.salesservice.load().subscribe(res => { 
      this.salesList = res;
      this.dataSource = new MatTableDataSource(this.salesList);  
      },
      error => {
        setTimeout(() => {
          this.snackBar.open("Network error: server is temporarily unavailable", "dismss", {
            panelClass: ["error"],
            verticalPosition: 'top'      
          });
        });         }
    );
  }

  public deleteSale(invoiceNumber:string){
    console.log("Delete Invoice Number  --->"+invoiceNumber);
    this.salesservice.remove(invoiceNumber)
    .subscribe(
      data => {
        this.model = data;
        if(this.model.status == "Success"){
          setTimeout(() => {
            this.snackBar.open("Sales Invoice deteted Successfully", "dismss", {
              panelClass: ["success"],
              verticalPosition: 'top'      
            });
          });
          this.getAllSODetails();
        }else{
          setTimeout(() => {
            this.snackBar.open("Network error: server is temporarily unavailable", "dismss", {
              panelClass: ["error"],
              verticalPosition: 'top'      
            });
          });           }
        
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
