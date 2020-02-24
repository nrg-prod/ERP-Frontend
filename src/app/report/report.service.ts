import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Purchase } from '../_models';
import { Vendor } from '../_models';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { User, Common } from '../_models/index';
import { HttpRequest, HttpEvent} from '@angular/common/http';
import { Employee } from '../_models';


@Injectable()
export class ReportService {    

    public url = require("../apiurl.json");
    private commonURL = this.url[0].apiurl+'reports/';

    constructor(private http: HttpClient) { }

    //********************* Report ************************

    //emp report Load 
    load(){
        return this.http.get(this.commonURL+'employeeReport');
    }
     //purchase report Load 
    purchaseload(){
        return this.http.get(this.commonURL+'purchaseReport');
    }
    //sales report Load 
    salesload(){
        return this.http.get(this.commonURL+'salesReport');
    }
    
}
