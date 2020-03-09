import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { VendorDetail } from "./vendor-and-customer-detail.model";
import { VendorDetailMock } from "../../../../config/mock/vendor-detail.mock";
import { TranslateService } from "src/app/core/services/translate/translate.service";
import { Utils } from "src/app/utilities/utilities";
import { VendorService } from '../../services/vendor.service';
import { CustomerService } from '../../services/customer.service';
import { Vendor,Customer } from 'src/app/_models';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: "app-vendor-and-customer-detail",
  templateUrl: "./vendor-and-customer-detail.component.html",
  styleUrls: ["./vendor-and-customer-detail.component.scss"]
})
export class VendorAndCustomerDetailComponent implements OnInit {
  @Input() vendorCode: number;
  @Input() componentType: string;
  @Output() backNavigation = new EventEmitter<null>();

//  vendor: VendorDetail;
  vendor:Vendor = new Vendor;
  customer:Customer;

  fieldLabels: string[];
  isEditMode: boolean;
  isAddNew: boolean;
  isAddNewCustomer:boolean;
  model:any ={};
  countryList:any;

  constructor(private ts: TranslateService,
    private vendorService: VendorService,
    private customerService: CustomerService,
    private snackBar: MatSnackBar
    ) {
           this.countryList = require("../../../../country.json");

    }

  ngOnInit() {}

  ngAfterViewInit(): void {
    setTimeout(() => {
      if (this.isAddNew) {
       // this.vendor = { ...VendorDetailMock };
        this.fieldLabels = Object.keys(this.vendor);
        this.vendor = Utils.resetFields(this.vendor);
      } else {
       // this.vendor = { ...VendorDetailMock };
        this.fieldLabels = Object.keys(this.vendor);
      }
    }, 50);
  }

  toggleEditMode() {
    this.isEditMode = !this.isEditMode;
  }

  backToVendorsList() {
    this.backNavigation.emit();
  }

  deleteVendor() {
    this.backNavigation.emit();
  }

  saveCustomer(){
    console.log("--------Save Customer-----");
    console.log("country name-->"+this.model.country);
    // call rest ful api 
    this.customerService.save(this.model)
    .subscribe(
      data => {
        this.customer =   data;    
        console.log("Response -->"+this.customer.status) 
        if(this.customer.status=="success"){
          setTimeout(() => {
            this.snackBar.open("Customer created Successfully", "", {
              panelClass: ["success"],
              verticalPosition: 'top'      
            });
          });

        }
        if(this.customer.status=="failure"){
          setTimeout(() => {
            this.snackBar.open("Network error: server is temporarily unavailable", "dismss", {
              panelClass: ["error"],
              verticalPosition: 'top'      
            });
          });                     }
      },
      error => {
        setTimeout(() => {
          this.snackBar.open("Network error: server is temporarily unavailable", "dismss", {
            panelClass: ["error"],
            verticalPosition: 'top'      
          });
        });     
      }
    ); } 


  saveVendor(){
    this.vendorService.save(this.model)
    .subscribe(
      data => {
        this.vendor =   data;    
        console.log("Response -->"+this.vendor.status) 
        if(this.vendor.status=="success"){
          setTimeout(() => {
            this.snackBar.open("Sales Order created Successfully", "dismss", {
              panelClass: ["success"],
              verticalPosition: 'top'      
            });
          });
    
       }
        if(this.vendor.status=="failure"){
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
