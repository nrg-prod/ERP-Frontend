import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Sales, Customer } from '../_models';

@Injectable()
export class SalesService {    

    public url = require("../apiurl.json");
    private commonURL = this.url[0].apiurl+'sales/';
    private categoryURL = this.url[0].apiurl+'category/';
    private productURL = this.url[0].apiurl+'item/';

    constructor(private http: HttpClient) { }

    //********************* Sales ************************

    // Load customer list data
    loadCustomerList(){
        return this.http.get<Customer>(this.commonURL+'loadCustomer');
    }
    
    // Save 
    save(salesarray: Array<any>,deliveryCost:string){
        salesarray.push([{sodate:"09-sep-2020",deliveryCost:deliveryCost}]);
        return this.http.post<Sales>(this.commonURL+'save',salesarray);
    }

    // Load 
    load(){
        return this.http.get<Sales>(this.commonURL+'load');
    }

    // get 
    get(id:number){
        return this.http.get<Sales>(this.commonURL+'get?id='+id);
    }

    // Update 
    update(saleseditarray: Array<any>){
        return this.http.put<Sales>(this.commonURL+'update',saleseditarray);
    }

    // Remove 
    remove(invoiceNumber:string){
        return this.http.delete<String>(this.commonURL+'remove?invoiceNumber='+invoiceNumber);
    }

    getCustomerDetails(customername: string){
        return this.http.get<Sales>(this.commonURL+'getCustomerDetails?customername='+customername);
    }

    geteditDetails(id: string){
        return this.http.get<Sales>(this.commonURL+'get?id='+id);
    }

    removePartId(id:string,invoiceNumber:string){
        return this.http.delete<String>(this.commonURL+'removePartId?id='+id+'&invoiceNumber='+invoiceNumber);
    }

    getUnitPrice(productName:string,category:string){
        return this.http.get<Sales>(this.commonURL+'getUnitPrice?productName='+productName+'&category='+category);
    }

    saveSalesReturn(returnarray: Array<any>){
        return this.http.post(this.commonURL+'saveReturn',returnarray);
    }

    loadCustomerName(){
        return this.http.get(this.commonURL+'loadCustomerName');
    }

    loadfilterData(sales:Sales){
        return this.http.post<Sales>(this.commonURL+'loadfilterData',sales);
    }
}
