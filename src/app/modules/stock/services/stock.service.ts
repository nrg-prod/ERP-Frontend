import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Stock } from 'src/app/_models';
import { environment } from "src/environments/environment";
import { API_ENDPOINTS } from "./../stock.config";

@Injectable()
export class StockService {    

   // public url = require("../apiurl.json");
  //  private commonURL = this.url[0].apiurl+'stock/';
  //  private purchaseURL = this.url[0].apiurl+'purchase/';

    constructor(private http: HttpClient) { }

    //********************* Stock ************************
    // Load 
    loadReturn(){
        //return this.http.get<Stock>(this.commonURL+'loadStockReturn');
        return this.http.get(`${environment.apiUrl}${API_ENDPOINTS.loadStockReturn}`);

    }

    saveStockReturn(stock: Stock){
        //return this.http.post<Stock>(this.commonURL+'saveStockReturn',stock);
        return this.http.post<Stock>(
          `${environment.apiUrl}${API_ENDPOINTS.saveStockReturn}`,
          stock
        ); 
    }

    save(stock: Stock){
        //return this.http.post<Stock>(this.commonURL+'save',stock);
        return this.http.post<Stock>(
          `${environment.apiUrl}${API_ENDPOINTS.save}`,
          stock
        ); 
    }

    // Load 
    loadDamage(){
      //  return this.http.get<Stock>(this.commonURL+'loadStockDamage');
        return this.http.get(`${environment.apiUrl}${API_ENDPOINTS.loadStockDamage}`);

        

    }
    // Update 
    update(stock: Stock){
       // return this.http.put<Stock>(this.commonURL+'update',stock);
        return this.http.put<Stock>(
          `${environment.apiUrl}${API_ENDPOINTS.update}`,
          stock
        );
    }

    loadInvoice(paymentOption:string){
      //  return this.http.get<Stock>(this.commonURL+'loadInvoice?paymentOption='+paymentOption);
        return this.http.get<Stock>(`${environment.apiUrl}${API_ENDPOINTS.loadInvoice}`+'?paymentOption='+paymentOption);


    }

    //------ Save StockIn Details -----
    saveStockIn(stockInarray: Array<any>,stockStatus:string){
        if(stockStatus == "FullStockIn"){
            //return this.http.post<Stock>(this.commonURL+'saveFullStockIn',stockInarray);
            return this.http.post<Stock>(
              `${environment.apiUrl}${API_ENDPOINTS.saveFullStockIn}`,
              stockInarray
            ); 
        }else if(stockStatus == "PartialStockIn"){
            //return this.http.post<Stock>(this.commonURL+'savePartialStockIn',stockInarray);
            return this.http.post<Stock>(
              `${environment.apiUrl}${API_ENDPOINTS.savePartialStockIn}`,
              stockInarray
            ); 
        }
    }

    loadStock(status:string){
       // return this.http.get<Stock>(this.commonURL+'loadStock?status='+status);
        return this.http.get<Stock>(`${environment.apiUrl}${API_ENDPOINTS.loadStock}`+'?status='+status);

    }

    getUnitPrice(productName:string,category:string){
       // return this.http.get<Stock>(this.purchaseURL+'getUnitPrice?productName='+productName+'&category='+category);
        return this.http.get<Stock>(`${environment.apiUrl}${API_ENDPOINTS.getUnitPrice}`+'?productName='+productName+'&category='+category);

    }

    saveStockOut(stock: Stock){
       // return this.http.post<Stock>(this.commonURL+'saveStockOut',stock);
        return this.http.get<Stock>(`${environment.apiUrl}${API_ENDPOINTS.saveStockOut,stock}`);

    }
}
