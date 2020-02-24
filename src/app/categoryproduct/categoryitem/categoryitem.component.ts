import { Component, OnInit, ViewChild ,ElementRef,Inject} from '@angular/core';
import { Router } from '@angular/router';
import { Category, Product } from 'src/app/_models';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AlertService } from 'src/app/_services';
import {MatDialog, MatDialogConfig, MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import { MatExpansionPanel, MatSnackBar, Sort } from "@angular/material";
import { CategoryproductService } from '../categoryproduct.service';
import { VendorService } from 'src/app/vendorcustomer/vendor.service';
import { Discount } from 'src/app/_models/discount';
import { CompleterData, CompleterService } from 'ng2-completer';
import { PercentPipe } from '../../../../node_modules/@angular/common';

// addnewcategory start
@Component({
  selector: 'addnewcategory',
  styleUrls: ['./addnewcategory.css'],
  templateUrl: './addnewcategory.html', 
})
export class AddnewcategoryComponent {
  countryList:any;
  priorityList:any;
  model: any = {};
  category:Category;
  constructor(
    private alertService: AlertService,
    private catprodservice: CategoryproductService,
    public dialogRef: MatDialogRef<AddnewcategoryComponent>,

    ) {
    }
  saveCategory(){
    this.catprodservice.save(this.model)
    .subscribe(
      data => {
        this.category =   data; 
        this.dialogRef.close();
        if(this.category.status=="success"){
          this.alertService.success("Saved Successfully");
          setTimeout(() => {
            this.alertService.clear();
          }, 2000);
        } 
        if(this.category.status=="failure"){
          this.alertService.success("not saved");
          setTimeout(() => {
            this.alertService.clear();
          }, 2000);
        }
      },
      error => {
        this.alertService.success("Serve Error ");
        setTimeout(() => {
          this.alertService.clear();
        }, 2000);
      }
    );  
  }
  close(e) {
    this.dialogRef.close();
  }
}
// addnewcategory end


// categoryeditdelete start
@Component({
  selector: 'categoryeditdelete',
  styleUrls: ['./categoryeditdelete.css'],
  templateUrl: './categoryeditdelete.html', 
})
export class CategoryeditdeleteComponent {
  countryList:any;
  categorylist:any;
  model: any = {};
  tempid=null;
  category: Category = new Category;
  constructor(
    private alertService: AlertService,
    public dialogRef: MatDialogRef<CategoryeditdeleteComponent>,
    private catprodservice: CategoryproductService,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) {
     // this.countryList = require("../../../assets/country.json");
    
    this.categorylist=data;
    console.log(this.categorylist);
    }

    onChangeCategory(categorycode: string){
      for(let i=0;i<this.categorylist.length;i++){
        if(this.categorylist[i].categorycode==categorycode){
          this.model.name=this.categorylist[i].name;
          this.model.description=this.categorylist[i].description;
        }
      }
     }
    
     saveCategoryeditdelete(){
      this.catprodservice.update(this.model)
      .subscribe(
        data => {
          this.category =   data;  
          this.dialogRef.close();
          this.alertService.success("Saved Successfully");
          setTimeout(() => {
            this.alertService.clear();
          }, 2000);
          this.dialogRef.close();
          console.log("saveCategoryeditdelete"); 
        },
        error => {
          this.alertService.error("Network error: server is temporarily unavailable");
        }
        );
    }

    categorydelete(categorycode: string){
      this.catprodservice.remove(categorycode)
      .subscribe(
        data => {
          this.category =  data;  
          if(this.category.status == "Success"){
          this.alertService.success("Category is Removed Successfully");
          this.dialogRef.close();
          setTimeout(() => {
            this.alertService.clear();
          }, 1500);
        }else if(this.category.status == "failure"){
          this.alertService.error("Not Deleted..");
          setTimeout(() => {
            this.alertService.clear();
          }, 1500);
        }
      },
      error => {
        this.alertService.error("Network error: server is temporarily unavailable");
      }
    );
  }
    close() {
    this.dialogRef.close();
  }
}
// categoryeditdelete end

// add promostion start
@Component({
  selector: 'addpromotion',
  styleUrls: ['./addpromotion.css'],
  templateUrl: './addpromotion.html', 
})
export class AddpromotionComponent {
  countryList:any;
  priorityList:any;
  model: any = {};
  allcategorylist:any= {};
  allitemnamelist:any= {};
  discount:Discount;
  //protected dataService: CompleterData;
  public dataService: CompleterData;
  
  constructor(
    private alertService: AlertService,
    public dialogRef: MatDialogRef<AddpromotionComponent>,
    private catprodservice: CategoryproductService,
    private completerService: CompleterService,
    ) {
      this.catprodservice.load()
      .subscribe(
         data => {
           this.allcategorylist = data;
           console.log("category name"+this.allcategorylist);
         },
        error => {
         setTimeout(() => {
           this.alertService.error("Network error: server is temporarily unavailable");
         }, 2000);
       }
      );

      //all item load
      this.catprodservice.loadItemName()
      .subscribe(
         data => {
           this.allitemnamelist = data;
           this.dataService = completerService.local(this.allitemnamelist);  
         },
        error => {
         setTimeout(() => {
           this.alertService.error("Network error: server is temporarily unavailable");
         }, 2000);
       }
      );
 
    }

    savePromotion(){
      console.log("Category Name -->"+this.model.categorycode);
      console.log("Item Name -->"+this.model.productname);
      console.log("discount from date-->"+this.model.fromdate_promotionperiod);
      console.log("discount to date-->"+this.model.todate_promotionperiod);
      console.log("discount type -->"+this.model.discountType);
      console.log("discount qty  -->"+this.model.qty);
      console.log("Free gift  -->"+this.model.freegift);
      console.log("Other item  -->"+this.model.others);

      this.catprodservice.addpromotionsave(this.model)
      .subscribe(
        data => {
          this.discount =   data; 
          this.dialogRef.close();
          if(this.discount.status=="success"){
            this.alertService.success("Promotion Saved Successfully");
            setTimeout(() => {
              this.alertService.clear();
            }, 2000);
          } 
          if(this.discount.status=="failure"){
            this.alertService.success("not saved");
            setTimeout(() => {
              this.alertService.clear();
            }, 2000);
          }
        },
        error => {
          this.alertService.error("Serve Error ");
          setTimeout(() => {
            this.alertService.clear();
          }, 2000);
        }
      ); 
    }
    close(e) {
    this.dialogRef.close();
  }
}
// add promostion end

//discountedit start
@Component({
  selector: 'discountedit',
  styleUrls: ['./discountedit.css'],
  templateUrl: './discountedit.html', 
})
export class DiscounteditComponent {
  countryList:any;
  priorityList:any;
  model: any = {};
  alldiscountlist: any={};
  allcategorylist:any= {};
  vendornamelist: any = {};
  discount: Discount;
  constructor(
    private alertService: AlertService,
    public dialogRef: MatDialogRef<DiscounteditComponent>,
    private catprodservice:CategoryproductService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.catprodservice.load()
     .subscribe(
        data => {
          this.allcategorylist = data;
          console.log("category name"+this.allcategorylist);
        },
       error => {
        setTimeout(() => {
          this.alertService.error("Network error: server is temporarily unavailable");
        }, 2000);
      }
     );
    this.loadDiscount();

    }


    loadDiscount(){
      let discount="discount"
      this.catprodservice.loadDiscount(discount)
      .subscribe(
        data => {
          this.alldiscountlist = data;
          console.log("discountedit code -->"+this.alldiscountlist[0].discountcode);
          for(let k=0;k<this.alldiscountlist.length;k++){
            if(this.alldiscountlist[k].discountcode==this.data){
              this.model.productname=this.alldiscountlist[k].productname;
              this.model.discount=this.alldiscountlist[k].discount;
              this.model.qty=this.alldiscountlist[k].qty;
              this.model.fromdate_promotionperiod=this.alldiscountlist[k].fromdate_promotionperiod;
              this.model.todate_promotionperiod=this.alldiscountlist[k].todate_promotionperiod;
              this.model.promotionperiod=this.model.fromdate_promotionperiod + "-"+ this.model.todate_promotionperiod;
              this.model.discountcode=this.alldiscountlist[k].discountcode;
            }
          }
        },
        error => {
          setTimeout(() => {
            this.alertService.error("Network error: server is temporarily unavailable");
          }, 2000);
        }
      );
    }
  updateDiscount(){
    console.log("category after update"+this.model.discountcode);
    this.catprodservice.updateDiscount(this.model)
    .subscribe(
      data => {
        this.discount =   data;
        this.dialogRef.close();
        this.alertService.success("Discount Updated Successfully");
        setTimeout(() => {
          this.alertService.clear();
        }, 2000);
        this.dialogRef.close();
      },
      error => {
        this.alertService.error("Network error: server is temporarily unavailable");
      }
      );
    }

    close(e) {
    this.dialogRef.close();
  }
}
//discountedit end

//discountdelete start
@Component({
  selector: 'discountdelete',
  styleUrls: ['./discountdelete.css'],
  templateUrl: './discountdelete.html', 
})
export class DiscountdeleteComponent {
  countryList:any;
  priorityList:any;
  model: any = {};
  constructor(
    private alertService: AlertService,
    public dialogRef: MatDialogRef<DiscountdeleteComponent>,
    ) {
    }

    close() {
    this.dialogRef.close();
  }
}
//discountdelete end

// addnewproduct start
@Component({
  selector: 'addnewproduct',
  styleUrls: ['./addnewproduct.css'],
  templateUrl: './addnewproduct.html', 
})
export class AddnewproductComponent {
  model: any = {};
  allcategorylist:any= {};
  vendornamelist: any = {};
  data: any = {};
  category:Category;
  product:Product;
  constructor(
    private alertService: AlertService,
    public dialogRef: MatDialogRef<AddnewproductComponent>,
    private catprodservice: CategoryproductService,
    private vendorservice: VendorService,
    ) {
      this.catprodservice.load()
     .subscribe(
        data => {
          this.allcategorylist = data;
          console.log("category name"+this.allcategorylist);
        },
       error => {
        setTimeout(() => {
          this.alertService.error("Network error: server is temporarily unavailable");
        }, 2000);
      }
     );

     this.vendorservice.load()
     .subscribe(
        data => {
          this.vendornamelist = data;
          console.log("category name"+this.vendornamelist);
        },
       error => {
          setTimeout(() => {
            this.alertService.error("Network error: server is temporarily unavailable");
          }, 2000);
      }
     );
     this.model.sellingprice = 0;
  }

  marginPrice:any;
  taxPrice:any;
  getSellingPrice(price:string,tax:string,margin:string){
    console.log("price-->"+price + "--- Tax --->"+tax+"-- Margin ---->"+margin);
    if(tax == null || tax == undefined){
      if(margin == null || tax == undefined){
        this.model.sellingprice = price;
      }else{
        this.marginPrice = Number.parseInt(price) * (Number.parseInt(margin)/100);
        this.model.sellingprice = Number.parseInt(price)+Number.parseInt(this.marginPrice);
      }
    }else if(margin == null || tax == undefined){
      if(tax == null || tax == undefined){
        this.model.sellingprice = price;
      }else{
        this.marginPrice = Number.parseInt(price) * (Number.parseInt(tax)/100);
        this.model.sellingprice = Number.parseInt(price)+Number.parseInt(this.marginPrice);
      }
    }else{
      this.marginPrice = Number.parseInt(price) * (Number.parseInt(margin)/100);
      this.taxPrice = Number.parseInt(price) * (Number.parseInt(tax)/100);
      this.model.sellingprice = Number.parseInt(price)+Number.parseInt(this.marginPrice)+Number.parseInt(this.taxPrice);
    }
  }

  saveAddNewProduct(category: string){
    console.log("Selling Price -->"+this.model.sellingprice);
    this.catprodservice.producsave(this.model)
    .subscribe(
      data => {
        this.product =   data; 
        this.dialogRef.close();
        if(this.product.status=="success"){
          this.alertService.success("New Item Saved Successfully");
          setTimeout(() => {
            this.alertService.clear();
          }, 2000);
          this.model.sellingprice = 0;
        } 
        if(this.product.status=="failure"){
          this.alertService.success("not saved");
          setTimeout(() => {
            this.alertService.clear();
          }, 2000);
        }
      },
      error => {
        this.alertService.error("Serve Error ");
        setTimeout(() => {
          this.alertService.clear();
        }, 2000);
      }
    ); 
    }
    close(e) {
    this.dialogRef.close();
  }
}
// addnewproduct end

//allproduct edit start
@Component({
  selector: 'allproductedit',
  styleUrls: ['./allproductedit.css'],
  templateUrl: './allproductedit.html', 
})
export class AllproducteditComponent {
  model: any = {};
  dialogConfig: any;
  dialog: any;
  allcategorylist:any= {};
  vendornamecodelist: any = {};
  allproducedittlist: any = {};
  category:Category;
  product:Product;
  constructor(
    private alertService: AlertService,
    public dialogRef: MatDialogRef<AllproducteditComponent>,
    private catprodservice: CategoryproductService,
    private vendorservice: VendorService,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) {
      this.catprodservice.loadCategoryName()
      .subscribe(
         data => {
           this.allcategorylist = data;
           console.log("category name & code -->"+this.allcategorylist);
         },
        error => {
          setTimeout(() => {
            this.alertService.error("Network error: server is temporarily unavailable");
          }, 2000);
       }
      );
 
      this.vendorservice.loadvendornamecode()
      .subscribe(
         data => {
           this.vendornamecodelist = data;
           console.log("Vendor name & code -->"+this.vendornamecodelist);
         },
        error => {
          setTimeout(() => {
            this.alertService.error("Network error: server is temporarily unavailable");
          }, 2000);
       }
      );

       //this.allproductlist="";
    this.catprodservice.loadItem("all")
    .subscribe(
      data => {
        this.allproducedittlist = data;
        console.log("productedit code -->"+this.allproducedittlist[0].prodcode);
        for(let k=0;k<this.allproducedittlist.length;k++){
          if(this.allproducedittlist[k].prodcode==this.data){
            this.model.productname=this.allproducedittlist[k].productname;
            this.model.description=this.allproducedittlist[k].description;
            this.model.price=this.allproducedittlist[k].price;
            this.model.tax=this.allproducedittlist[k].tax;
            this.model.margin=this.allproducedittlist[k].margin;
            this.model.sellingprice=this.allproducedittlist[k].sellingprice;
            this.model.vendorcode=this.allproducedittlist[k].vendorcode;
            this.model.vendorname=this.allproducedittlist[k].vendorname;
            this.model.categorycode=this.allproducedittlist[k].categorycode;
            this.model.categoryname=this.allproducedittlist[k].categoryname;
            console.log("category name -->"+this.model.categoryname);
            console.log("category code -->"+this.model.categorycode);
            this.model.categorycode=this.allproducedittlist[k].categoryname+"-"+this.allproducedittlist[k].categorycode;
            console.log("category code & name -->"+this.model.categorycode);
            console.log("vendor name -->"+this.model.vendorname);
            console.log("vendor code -->"+this.model.vendorcode);
            this.model.vendorcode=this.allproducedittlist[k].vendorname+"-"+this.allproducedittlist[k].vendorcode;
            console.log("vendor name & code -->"+this.model.vendorcode);


          }
        }
        this.model.prodcode=this.allproducedittlist[0].prodcode;
      },
      error => {
        setTimeout(() => {
          this.alertService.error("Network error: server is temporarily unavailable");
        }, 2000);
      }
    );
     
  }
/*
  setItem(category: string){
    this.catprodservice.setItem(this.model)
    .subscribe(
      data => {
        this.product =   data; 
        this.dialogRef.close();
        if(this.product.status=="success"){
          this.alertService.success("Saved Successfully");
          setTimeout(() => {
            this.alertService.clear();
          }, 2000);
        } 
        if(this.product.status=="failure"){
          this.alertService.success("not saved");
          setTimeout(() => {
            this.alertService.clear();
          }, 2000);
        }
      },
      error => {
        this.alertService.error("Serve Error ");
        setTimeout(() => {
          this.alertService.clear();
        }, 2000);
      }
    ); 
    }
    */
  ngOnInit() {
  }
  setItem(){
    console.log("setItem method");
    this.catprodservice.setItem(this.model)
    .subscribe(
      data => {
        this.product =   data;
        this.dialogRef.close();
        this.alertService.success("Item Updated Successfully");
        setTimeout(() => {
          this.alertService.clear();
        }, 2000);
        console.log("saveproducteditdelete"); 
      },
      error => {
        this.alertService.error("Network error: server is temporarily unavailable");
      }
      );
  }

    close() {
      this.dialogRef.close();
    }
}
//allproduct edit end

// productview start
@Component({
  selector: 'productview',
  styleUrls: ['./productview.css'],
  templateUrl: './productview.html', 
})
export class ProductviewComponent {
  countryList:any;
  priorityList:any;
  model: any = {};
  constructor(
    private alertService: AlertService,
    public dialogRef: MatDialogRef<ProductviewComponent>,
    ) {
    }
}
// productview end

// productedit start
@Component({
  selector: 'productedit',
  styleUrls: ['./productedit.css'],
  templateUrl: './productedit.html', 
})
export class ProducteditComponent {
  countryList:any;
  priorityList:any;
  model: any = {};
  tempid=null;
  constructor(
    private alertService: AlertService,
    public dialogRef: MatDialogRef<ProducteditComponent>,
  ) {
    }
   
  saveProductEdit(){
      this.alertService.success("Saved Successfully");
      setTimeout(() => {
        this.alertService.clear();
      }, 2000);
    this.dialogRef.close();
    console.log("saveProductEdit");
    }
    close(e) {
    this.dialogRef.close();
  }
 
}
// productedit end

// categorytable start
@Component({
  selector: 'categorytable',
  styleUrls: ['./categorytable.css'],
  templateUrl: './categorytable.html', 
})
export class CategorytableComponent {
  countryList:any;
  priorityList:any;
  model: any = {};
  tempid=null;
  constructor(
    private alertService: AlertService,
    public dialogRef: MatDialogRef<CategorytableComponent>,
  ) {
    }
 
}
// categorytable end







// Main compoent
@Component({
  selector: 'app-categoryitem',
  templateUrl: './categoryitem.component.html',
  styleUrls: ['./categoryitem.component.css']
})
export class CategoryItemComponent implements OnInit {
 allproductlist : any= {};// Product;  
  product:Product;
  categorylist: any= {};
  allproducedittlist:any;
  alldiscountlist: any= {};
  allfreegiftlist: any= {};
  dialogConfig = new MatDialogConfig();
  isDtInitialized:boolean = false;
  model: any = {};
  discount:Discount;
  itemtitle:string="All Items";
  // All Product
  displayedColumns: string[] = ['productname','description','vendorcode','sellingprice','price','editdelete'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator,{ static: true }) paginator: MatPaginator;
  @ViewChild(MatSort,{ static: true }) sort: MatSort;
 
  // Free Gift Data table
  displayedColumns2: string[] = ['productname','discounttime','action'];
  dataSource2: MatTableDataSource<any>;
  @ViewChild(MatPaginator,{ static: true }) paginator2: MatPaginator;
  @ViewChild(MatSort,{ static: true }) sort2: MatSort;
  ngAfterViewInit() {
    this.dataSource2.paginator = this.paginator2;
    this.dataSource2.sort = this.sort2;
  }
  tempid=null;
  tempnumber=null;
  public leftdetails=false;
  public discountdetails='none';
  public editdeletediv=false;
  public fiberdetails='none';
  public alldetails='none';
  public freegiftdetails='none';

  successdialog = 'none';
   // masterlist
   masterlist:  any =[
  {
    number:'01',
    name:'All Product',
  },
  {
    number:'02',
    name:'Discount',
  },
  {
    number:'03',
    name:'Free Gifts',
  },
]; 
  dialogRef: any;
 
  constructor(
    private alertService: AlertService,
    private dialog: MatDialog,
    private router: Router,
    private catprodservice: CategoryproductService,
    ) { 

      this.dataSource = new MatTableDataSource(this.allproductlist);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }

   
    
  ngOnInit() {
   
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.leftdetails=true;
    this.allcategorylist();
    this.allproductList();
    //this.alldiscountList();
    this.allfreegiftList();

  }



  allcategorylist(){
    this.categorylist="";
    this.catprodservice.load()
    .subscribe(
      data => {
        this.categorylist = data;
        console.log("Category code-->"+this.categorylist[0].categorycode)
      },
      error => {
        setTimeout(() => {
          this.alertService.error("Network error: server is temporarily unavailable");
        }, 2000);
      }
    );
  }

  allproductList(){
    this.catprodservice.loadItem("all")
    .subscribe(
      data => {
        this.allproductlist = data;
        console.log("Product length -->"+this.allproductlist.length);
        this.dataSource = new MatTableDataSource(this.allproductlist);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error => {
        setTimeout(() => {
          this.alertService.error("Network error: server is temporarily unavailable");
        }, 2000);
      }
    );
  }

  alldiscountList(){
    let discount="discount";
    this.catprodservice.loadDiscount(discount)
    .subscribe(
      data => {
        this.alldiscountlist = data;
        console.log("discount code -->"+this.alldiscountlist[0].discountcode);
      },
      error => {
        setTimeout(() => {
          this.alertService.error("Network error: server is temporarily unavailable");
        }, 2000);
      }
    );
  }

  allfreegiftList(){
    console.log("free gift");
    let discount="freegift";
    this.catprodservice.loadDiscount(discount)
    .subscribe(
      data => {
        this.allfreegiftlist = data;
      },
      error => {
        setTimeout(() => {
          this.alertService.error("Network error: server is temporarily unavailable");
        }, 2000);
      }
    );
  }


  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  showCategoryItems(categorycode:string,categoryname:string){
    console.log("Category code -->"+categorycode);
    console.log("Category name -->"+categoryname);
    this.itemtitle=categoryname;
    console.log("Inside showCategoryItems");
    this.catprodservice.loadItem(categorycode)
    .subscribe(
      data => {
        this.allproductlist = data;
        console.log("Product length -->"+this.allproductlist.length);
        this.dataSource = new MatTableDataSource(this.allproductlist);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      },
      error => {
        setTimeout(() => {
          this.alertService.error("Network error: server is temporarily unavailable");
        }, 2000);
      }
    );
    //this.allproductList();
    this.alldetails='block';
    this.discountdetails='none';
    this.freegiftdetails='none';
    this.editdeletediv=false;

  }
categorydetails(number: string){
  console.log("Inside categorydetails");
  if(this.tempid!==null){
    document.getElementById(this.tempid).style.backgroundColor='#272E34';
  }
  this.tempid=number;
  document.getElementById(this.tempid).style.backgroundColor='#5B6065';
  this.leftdetails=true;
// All item tab click
  if(number=='01'){
    console.log("Inside all items");
    this.itemtitle="All Items";
    this.allproductList();
    this.alldetails='block';
    this.discountdetails='none';
    this.freegiftdetails='none';
    this.editdeletediv=false;
  }

  // Discount tab click
  if(number=='02'){
    this.alldiscountList();
    console.log("Inside discount");
    this.alldetails='none';
   this.discountdetails='block';
    this.alldetails='none';
    this.freegiftdetails='none';
    this.editdeletediv =false;
  }

  // Free gift tab click
  if(number=='03'){
    this.allfreegiftList();
    console.log("Inside free gift");
    this.dataSource2 = new MatTableDataSource(this.allfreegiftlist);
    this.dataSource2.paginator = this.paginator2;
    this.dataSource2.sort = this.sort2;
    this.freegiftdetails='block';
    this.itemtitle="Free Gift";
    this.leftdetails=true;
    this.alldetails='none';
    this.discountdetails='none';
    //this.fiberdetails='block';
    this.editdeletediv=false;
  }
}

productlist(number: string){
  if(this.tempnumber!==null){
    document.getElementById(this.tempnumber).style.backgroundColor='#272E34';
  }
  this.tempnumber=number;
  document.getElementById(this.tempnumber).style.backgroundColor='#5B6065';
  this.leftdetails=true;

  if(number=='PROD1'){
    this.alldetails='none';
  }
  if(number=='PROD2'){
    this.alldetails='none';
    //this.discountdetails=false;
    //this.fiberdetails=false;
    this.editdeletediv=false;
  }
  if(number=='PROD3'){
    this.alldetails='none';
    //this.discountdetails=false;
    //this.fiberdetails=false;
    this.editdeletediv=false;
  }
  if(number=='PROD4'){
    this.alldetails='none';
    //this.fiberdetails=false;
    //this.discountdetails=false;
    this.editdeletediv=false;
  }
  if(number=='PROD5'){
    this.alldetails='none';
    //this.discountdetails=false;
    //this.fiberdetails=false;
    this.editdeletediv=false;
  }
}


  editdelete(){
    this.editdeletediv=true;
   // this.discountdetails=false;
  }

  addNewCategory(){
    //this.successdialog = 'block';

    this.dialogConfig.disableClose = true;
    this.dialogConfig.autoFocus = true;
    this.dialogConfig.position = {
      'top': '1000',
      left: '100'
    };
    this.dialog.open(AddnewcategoryComponent,{
      panelClass: 'addnewcategory'
     // data: {dialogTitle: "hello", dialogText: "text"},
    })
    .afterClosed().subscribe(result => {
      this.allcategorylist();
    }
    );
  }

  addpromotion(){
    //this.successdialog = 'block';

    this.dialogConfig.disableClose = true;
    this.dialogConfig.autoFocus = true;
    this.dialogConfig.position = {
      'top': '1000',
      left: '100'
    };
    this.dialog.open(AddpromotionComponent,{
      panelClass: 'addpromotion'
     // data: {dialogTitle: "hello", dialogText: "text"},
    })
    .afterClosed().subscribe(result => {
      this.alldiscountList();
    });
      
  }

  
  categoryEditDelete(){
    this.dialogConfig.disableClose = true;
    this.dialogConfig.autoFocus = true;
    this.dialogConfig.position = {
      'top': '1000',
      left: '100'
    };
    this.dialog.open(CategoryeditdeleteComponent,{
      data: this.categorylist,
      panelClass: 'categoryeditdelete'

    })
    .afterClosed().subscribe(result => {
      this.allcategorylist();
    });
  }

  discountEdit(discountcode:string){
    console.log("discount code --> "+discountcode);
    console.log("inside discountEdit ");
    //this.successdialog = 'block';
    this.dialogConfig.disableClose = true;
    this.dialogConfig.autoFocus = true;
    this.dialogConfig.position = {
      'top': '1000',
      left: '100'
    };
    this.dialog.open(DiscounteditComponent,{
      panelClass: 'discountedit',
      data: discountcode,
    })
    .afterClosed().subscribe(result => {
    });
      
  }

  discountDelete(discountcode: string){
    console.log("discount detlete - promotion code -->"+discountcode);
    this.catprodservice.discountremove(discountcode)
      .subscribe(
        data => {
          this.discount =  data;  
          if(this.discount.status == "Success"){
          this.alertService.success("Discount Deleted Successfully");
          setTimeout(() => {
            this.alldiscountList();
            this.alertService.clear();
          }, 1500);
        }else if(this.discount.status == "failure"){
          this.alertService.error("Not Deleted..");
          setTimeout(() => {
            this.alertService.clear();
          }, 1500);
        }
      },
      error => {
        this.alertService.error("Network error: server is temporarily unavailable");
      }
    );
  }

  addNewProduct(){
    this.dialogConfig.disableClose = true;
    this.dialogConfig.autoFocus = true;
    this.dialogConfig.position = {
      'top': '100',
      left: '100'
    };
    this.dialog.open(AddnewproductComponent,{ 
      panelClass: 'addnewproduct',
    })
    .afterClosed().subscribe(result => {
      this.allproductList();
    }); 
  }

  productview(){
    this.dialogConfig.disableClose = true;
    this.dialogConfig.autoFocus = true;
    this.dialogConfig.position = {
      'top': '100',
      left: '100'
    };
    this.dialog.open(ProductviewComponent,{ 
      panelClass: 'productview'
    })
    .afterClosed().subscribe(result => {
    }); 
  }

  productEdit(){
    this.dialogConfig.disableClose = true;
    this.dialogConfig.autoFocus = true;
    this.dialogConfig.position = {
      'top': '100',
      left: '100'
    };
    this.dialog.open(ProducteditComponent,{ 
      panelClass: 'productedit'
    })
    .afterClosed().subscribe(result => {
      this.allproductList();
    }); 
  }

  allproducteditcall(prodcode: string){
    this.dialogConfig.disableClose = true;
  this.dialogConfig.autoFocus = true;
  this.dialogConfig.position = {
    'top': '1000',
    left: '100'
  };
  this.dialog.open(AllproducteditComponent,{
    panelClass: 'allproductedit',
    data: prodcode,

  })
  .afterClosed().subscribe(result => {
  });

  }
  allproductdelete(prodcode: string){
    this.catprodservice.productremove(prodcode)
      .subscribe(
        data => {
          this.product =  data;  
          if(this.product.status == "Success"){
          this.alertService.success("Item Deleted Successfully");
          setTimeout(() => {
            this.allproductList();
            this.alertService.clear();
          }, 1500);
        }else if(this.product.status == "failure"){
          this.alertService.error("Not Deleted..");
          setTimeout(() => {
            this.alertService.clear();
          }, 1500);
        }
      },
      error => {
        this.alertService.error("Network error: server is temporarily unavailable");
      }
    );
  }

  }
