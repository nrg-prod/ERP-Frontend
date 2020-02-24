import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Stock } from '../_models';

@Injectable()
export class StockService {    

    public url = require("../apiurl.json");
    private commonURL = this.url[0].apiurl+'stock/';
    private purchaseURL = this.url[0].apiurl+'purchase/';

    constructor(private http: HttpClient) { }

    //********************* Stock ************************
    // Load 
    loadReturn(){
        return this.http.get<Stock>(this.commonURL+'loadStockReturn');
    }

    saveStockReturn(stock: Stock){
        return this.http.post<Stock>(this.commonURL+'saveStockReturn',stock);
    }

    save(stock: Stock){
        return this.http.post<Stock>(this.commonURL+'save',stock);
    }

    // Load 
    loadDamage(){
        return this.http.get<Stock>(this.commonURL+'loadStockDamage');
    }
    // Update 
    update(stock: Stock){
        return this.http.put<Stock>(this.commonURL+'update',stock);
    }

    loadInvoice(paymentOption:string){
        return this.http.get<Stock>(this.commonURL+'loadInvoice?paymentOption='+paymentOption);
    }

    //------ Save StockIn Details -----
    saveStockIn(stockInarray: Array<any>,stockStatus:string){
        if(stockStatus == "FullStockIn"){
            return this.http.post<Stock>(this.commonURL+'saveFullStockIn',stockInarray);
        }else if(stockStatus == "PartialStockIn"){
            return this.http.post<Stock>(this.commonURL+'savePartialStockIn',stockInarray);
        }
    }

    loadStock(status:string){
        return this.http.get<Stock>(this.commonURL+'loadStock?status='+status);
    }

    getUnitPrice(productName:string,category:string){
        return this.http.get<Stock>(this.purchaseURL+'getUnitPrice?productName='+productName+'&category='+category);
    }

    saveStockOut(stock: Stock){
        return this.http.post<Stock>(this.commonURL+'saveStockOut',stock);
    }
}
